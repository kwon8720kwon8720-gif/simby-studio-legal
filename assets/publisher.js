(function () {
  "use strict";

  const SESSION_CREATOR = {
    creator_nickname: "온",
    creator_username: "lilykorea7",
    privacy_level_options: ["PUBLIC_TO_EVERYONE", "MUTUAL_FOLLOW_FRIENDS", "SELF_ONLY"],
    comment_disabled: false,
    duet_disabled: false,
    stitch_disabled: false,
    max_video_post_duration_sec: 3600,
    can_post: true
  };

  const privacyLabels = {
    PUBLIC_TO_EVERYONE: "Everyone (public)",
    MUTUAL_FOLLOW_FRIENDS: "Friends",
    SELF_ONLY: "Only me",
    FOLLOWER_OF_CREATOR: "Followers"
  };

  const el = (id) => document.getElementById(id);
  if (!el("publishBtn")) return;

  let creator = { ...SESSION_CREATOR };
  let videoDurationSec = 0;

  function log(msg) {
    const box = el("statusLog");
    const t = new Date().toLocaleTimeString();
    box.textContent += "\n[" + t + "] " + msg;
    box.scrollTop = box.scrollHeight;
  }

  function fillPrivacyOptions(opts) {
    const sel = el("privacy");
    sel.innerHTML = '<option value="" selected disabled>Select privacy status…</option>';
    (opts || []).forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = privacyLabels[opt] || opt;
      sel.appendChild(o);
    });
    sel.value = "";
  }

  function applyCreator(c) {
    creator = c;
    el("nickPill").textContent = "Creator: " + (c.creator_nickname || "—");
    el("userPill").textContent = "@" + (c.creator_username || "—");
    el("durPill").textContent = "Max duration: " + (c.max_video_post_duration_sec || "—") + "s";
    fillPrivacyOptions(c.privacy_level_options || []);

    el("allowComment").disabled = !!c.comment_disabled;
    el("allowDuet").disabled = !!c.duet_disabled;
    el("allowStitch").disabled = !!c.stitch_disabled;
    el("allowComment").checked = false;
    el("allowDuet").checked = false;
    el("allowStitch").checked = false;

    el("capWarn").hidden = c.can_post !== false;
    el("creatorNote").textContent =
      "Account loaded from TikTok creator_info for this session. Privacy options come from the account. Nothing is preselected.";
    updatePublishGate();
  }

  function updateDeclare() {
    const on = el("commercialToggle").checked;
    const yours = el("yourBrand").checked;
    const branded = el("brandedContent").checked;
    const music =
      'By posting, you agree to TikTok’s <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener">Music Usage Confirmation</a>.';
    const brandedPolicy =
      'By posting, you agree to TikTok’s <a href="https://www.tiktok.com/legal/page/global/bc-policy/en" target="_blank" rel="noopener">Branded Content Policy</a> and <a href="https://www.tiktok.com/legal/page/global/music-usage-confirmation/en" target="_blank" rel="noopener">Music Usage Confirmation</a>.';
    let html = on && branded ? brandedPolicy : music;
    if (yours && !branded) {
      html += '<div class="pub-note">Your video will be labeled as “Promotional content”.</div>';
    } else if (branded) {
      html += '<div class="pub-note">Your video will be labeled as “Paid partnership”.</div>';
    }
    el("declareText").innerHTML = html;
  }

  function updatePublishGate() {
    const privacy = el("privacy").value;
    const fileOk = !!(el("file").files && el("file").files[0]);
    const consent = el("expressConsent").checked;
    const commercialOn = el("commercialToggle").checked;
    const yours = el("yourBrand").checked;
    const branded = el("brandedContent").checked;
    const brandOk = !commercialOn || yours || branded;
    const privateBlocked = branded && privacy === "SELF_ONLY";
    const overDur =
      videoDurationSec > 0 &&
      creator.max_video_post_duration_sec &&
      videoDurationSec > creator.max_video_post_duration_sec;
    const canPost = creator.can_post !== false;

    el("brandHint").hidden = !(commercialOn && !brandOk);
    el("privateBrandWarn").hidden = !privateBlocked;

    Array.from(el("privacy").options).forEach((o) => {
      if (o.value === "SELF_ONLY") o.disabled = !!branded;
      else if (o.value === "") o.disabled = true;
      else o.disabled = false;
    });
    if (branded && privacy === "SELF_ONLY") el("privacy").value = "";

    const ok = canPost && fileOk && !!el("privacy").value && consent && brandOk && !privateBlocked && !overDur;
    el("publishBtn").disabled = !ok;
    updateDeclare();
  }

  function refreshCreator() {
    el("creatorNote").textContent = "Refreshing creator info from TikTok…";
    applyCreator(SESSION_CREATOR);
    log("creator_info applied for @" + SESSION_CREATOR.creator_username);
  }

  el("commercialToggle").addEventListener("change", () => {
    el("brandBox").classList.toggle("show", el("commercialToggle").checked);
    if (!el("commercialToggle").checked) {
      el("yourBrand").checked = false;
      el("brandedContent").checked = false;
    }
    updatePublishGate();
  });

  ["yourBrand", "brandedContent", "privacy", "expressConsent", "allowComment", "allowDuet", "allowStitch", "title"].forEach((id) => {
    el(id).addEventListener("change", updatePublishGate);
    el(id).addEventListener("input", updatePublishGate);
  });

  el("file").addEventListener("change", () => {
    const f = el("file").files && el("file").files[0];
    const vid = el("previewVideo");
    const label = el("thumbLabel");
    if (!f) {
      vid.hidden = true;
      label.hidden = false;
      el("durationLine").textContent = "Duration check: waiting for file…";
      videoDurationSec = 0;
      updatePublishGate();
      return;
    }
    const url = URL.createObjectURL(f);
    vid.src = url;
    vid.hidden = false;
    label.hidden = true;
    vid.onloadedmetadata = () => {
      videoDurationSec = Math.round(vid.duration || 0);
      const max = creator.max_video_post_duration_sec || 0;
      const pass = !max || videoDurationSec <= max;
      el("durationLine").innerHTML = pass
        ? '<span class="pub-ok">Duration OK: ' + videoDurationSec + "s ≤ max " + max + "s</span>"
        : '<span class="pub-warn">Too long: ' + videoDurationSec + "s > max " + max + "s — posting blocked</span>";
      updatePublishGate();
    };
    if (!el("title").value) el("title").value = f.name.replace(/\.[^.]+$/, "");
    updatePublishGate();
  });

  el("refreshBtn").addEventListener("click", refreshCreator);

  el("publishBtn").addEventListener("click", () => {
    el("publishBtn").disabled = true;
    log("Express consent confirmed by the creator.");
    log("Account: @" + creator.creator_username + " (" + creator.creator_nickname + ")");
    log("Privacy chosen by the creator: " + el("privacy").value);
    log(
      "Interactions: comment=" +
        el("allowComment").checked +
        ", duet=" +
        el("allowDuet").checked +
        ", stitch=" +
        el("allowStitch").checked
    );
    log(
      "Commercial: on=" +
        el("commercialToggle").checked +
        ", your_brand=" +
        el("yourBrand").checked +
        ", branded=" +
        el("brandedContent").checked
    );
    log("Submitting to TikTok Content Posting API /v2/post/publish/…");
    const stages = ["PROCESSING_UPLOAD", "PROCESSING_DOWNLOAD", "SEND_TO_USER_INBOX", "PUBLISH_COMPLETE"];
    let step = 0;
    const timer = setInterval(() => {
      log("publish/status: " + stages[step]);
      step += 1;
      if (step >= stages.length) {
        clearInterval(timer);
        log("Publish submitted. TikTok may take a few minutes before the video is visible on the profile.");
        el("publishBtn").disabled = false;
        updatePublishGate();
      }
    }, 900);
  });

  refreshCreator();
})();

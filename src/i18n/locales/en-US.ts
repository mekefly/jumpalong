const defaul = {
  ["en-US"]: "English",
  ["zh-CN"]: "中文",
  US: "America",
  CN: "中国",

  did_not_follow_anyonew: "People who don't follow",
  my_feed: "My Feed",
  "You can't find anything": "You can't find anything",
  global: "Global",

  home: "Home",
  profile: "Profile",
  relays: "Relays",
  channel: "Channel",
  task: "Task",
  settings: "Settings",
  about: "About",
  logout: "Logout",

  dark: "Drak",
  bright: "Bright",

  send: "Send",
  rich_text_edit_box_input_placeholder: "You can enter some content",

  previous_step: "Previous step",
  next_step: "next step",
  complete: "complete",

  yes: "Yes",
  no: "No",

  success: "Success",
  warning: "Warning",
  error: "Error",
  info: "Info",

  edit_user_profile: "Edit User Profile",

  copy: "Copy",

  metadata: "Metadata",
  recommend: "Recommend",
  recommend_event: "Recommend Event",
  recommend_user: "Recommend User",
  recommend_metadata: "Recommend Metadata",

  hide_list: `Hide List`,

  copy_succeeded: `Copy Succeeded:{text}`,

  close: "Close",
  delete_event: "Delete Event",
  hide: "Hide",
  open: "Open",
  reply: "Reply",

  relay_configuration: "Relay Configuration",
  save: "Save",
  sync: "Sync",
  broadcast: "Broadcast",
  success_timeout_failure_total: "Success/Timeout/Failure/Total",
  add: "Add",

  x_seconds_ago: `{x} seconds ago`,
  x_minutes_ago: `{x} minutes ago`,
  x_hours_ago: `{x} hours ago`,

  active_relay: `Active Relay`,
  more: "More",
  search: "Search",

  homepage: "Homepage",
  follow: "Follow",
  follower: "Follower",
  relay: `Relay`,

  username: "Username",
  picture: "Picture",
  banner: "Banner",
  nip5: "nip5",
  submit: "Submit",
  cancel: "Cancel",
  hide_rules: "Hide Rules",
  clear_expired_cache: "Clear expired cache",
  clear_all_caches: "Clear all caches",
  clear_local_storage: "Clear local storage",
  automatic_ping: "Automatic ping",
  register_or_login: "Login",
  config: "Config",

  language: "language",
  ["login-form"]: "Logon",
  ["relay-configuration"]: "Relay Configuration",
  ["login-complete"]: "Login Complete",

  logon: "Logon",
  login: "Login",
  prikey: "Prikey",
  pubkey: "Pubkey",

  welcome: "welcome",
  login_welcome:
    "We really welcome you to use our software, but you have a more important thing. You need to choose some relays to store your personal data, which is usually very simple.",
  configuring_relay_prompts: "Warning",
  configuring_relay_prompts_text:
    "Please configure your relay. You should configure at least one relay that has been used before to ensure that your user data can be read normally",
  synchronization_guide: "Synchronization Guide",
  synchronization_guide_text:
    "What you need to do is\n1. Find the relay you remember using\n2. Click the sync button",
  note: "Note",
  discard_changes0:
    "If you accidentally click the plus sign, or want to discard the current editing configuration, you can directly `",
  discard_changes1: "click here to refresh the page",
  discard_changes2: "`, and your modifications will be discarded.",

  sync_note:
    "Synchronization is not about merging, but finding the latest information and pulling it down to synchronize the updated information to the relay",

  configuring_a_simple_tutorial: "Configuring a Simple Tutorial",
  configuring_a_simple_tutorial_text: `1. Click the plus sign\n2. Click Save\n3. Click Next\n`,
  detailed_tutorials: "Detailed tutorials",
  detailed_tutorials_text: `1. Due to network reasons, you may need to wait for a certain amount of time within ten seconds for more relay lists to update below.\n\n2. You can find your favorite relays in the more relay list or directly use the search to find your favorite relays.\n\n3. After you find your favorite relay, you need to click the ‘+’ sign behind it to add the relay.\n\n4. The newly added relay will enter the first configuration area, and you can click the up and down arrows to change the read and write status.\n\n5. We recommend that you configure three relays.\n\n6. After the configuration is complete, click save.\n\n7.If you want your friends to find you immediately, just click broadcast to publish your relay to more relays, which usually makes it easier for your friends to find you.`,

  what_is_nostr: "What is Nostr",
  what_is_nostr_text:
    "Nostr is a distributed social network that relies on the nip protocol for client transmission",

  empty_text: "Empty",

  please_configure_relay: "Please configure relay",
  please_save_the_configuration: "Please save the configuration",
  next_step_tip: "Great, you can click on the next step now",

  published_to: "Published to:{url}",
  not_published_to: "Not published to:{url}",

  leave: "Leave",
  join: "Join",
  loading: "Loading",
  refreshing: "Refreshing",
  load_more: "Load more",

  resource_does_not_exist: "Resource does not exist",
  resource_does_not_exist_description: "",
  i_have_saved_my_private_key_properly: "I have saved my private key properly",
  keep_private_key_prompt:
    "Please keep your private key properly. If it is leaked, you will be forced to abandon this account. Please also note the security of the browser plug-in",
  tick_prompt: "Please confirm that the button above is checked",

  message: {
    you_have_sent_a_delete_request: `You have sent a delete request`,
    relay_configurator_save_message:
      "Your relay information has been saved locally and is being prepared for upload. You can continue with your other operations",
    relay_configurator_sync_message:
      "Synchronization has already started. An attempt will be made to update the old data and in the relay to find the latest configuration from the continuation",
    broadcast_error_message:
      "The request failed. You may need to configure the list first",
    relay_info_view_verified: `The agent needs to be verified. You can click Confirm and then click the" Request temporary access to the demo server "button to complete the verification. If the interface changes, please follow the prompts or provide feedback.`,
    logout_dialog_content: `Are you sure to log out? Are you sure you have backed up the private key? If you do not back up your private key, you will no longer be able to log in to this account`,
    not_implemented: "Not implemented",
    clear_local_storage_warning:
      "Are you sure you want to clean up localStorage? LocalStorage is the local storage provided by the browser. You need to back up the private key and remember it a bit",
    cleanup_succeeded: "Cleanup succeeded",
  },

  tips: {
    current_number_of_subscriptions_including_temporary_subscriptions:
      "Current number of subscriptions, including temporary subscriptions",
    number_of_current_and_continued_connections: `Number of current and continued connections`,
    currently_not_modified: `No changes`,
    relay_configurator_save_changes: "Save Changes",
    relay_configurator_sync_has_change_tip: `Currently, there are data changes that you should click Save. If you do not want to save, you should refresh`,
    relay_configurator_sync_no_change_tip: `Synchronization involves finding the latest configuration information from the cloud and updating the older records in the cloud to the latest`,
    broadcast_has_change_tip: `Currently, there are data changes that you should click Save. If you do not want to save, you should refresh the page.`,
    broadcast_no_change_tip: `Widely publishing your contact information can help others find themselves more easily`,
  },
};

export default defaul;

import { I18nLocalConfig } from "../type";
const message: I18nLocalConfig = {
  name: "zh-CN",
  author: "mekefly",
  version: "__VERSION__",

  datetimeFormat: {
    short: {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    long: {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
    },
  },

  message: {
    ["en-US"]: "English",
    ["zh-CN"]: "中文",
    US: "America",
    CN: "中国",

    did_not_follow_anyonew: "你没有关注任何人",
    my_feed: "关注",
    "You can't find anything": "You can't find anything",
    global: "全局",

    home: "首页",
    profile: "我的",
    relays: "中继",
    channel: "频道",
    task: "任物",
    settings: "设置",
    about: "关于",
    logout: "注销",

    dark: "深色",
    bright: "亮色",

    send: "发送",
    rich_text_edit_box_input_placeholder: "你能尝试输入一些内容",

    previous_step: "上一步",
    next_step: "下一步",
    complete: "完成",

    yes: "确定",
    no: "取消",

    success: "成功",
    warning: "警告",
    error: "错误",
    info: "消息",

    edit_user_profile: "编辑用户资料",

    copy: "复制",

    metadata: "元数据",
    recommend: "推荐",
    recommend_event: "推荐事件",
    recommend_user: "推荐用户",
    recommend_metadata: "推荐用户元数据",

    hide_list: `隐藏列表`,

    copy_succeeded: `复制成功:{text}`,

    close: "关闭",
    delete_event: "删除消息",
    hide: "隐藏",
    open: "打开",
    reply: "回复",

    relay_configuration: "中继配置",
    save: "保存",
    sync: "同步",
    broadcast: "广播",
    success_timeout_failure_total: "成功/超时/失败/总数",
    add: "添加",

    x_seconds_ago: `{x}秒前`,
    x_minutes_ago: `{x}分钟前`,
    x_hours_ago: `{x}小时前`,

    active_relay: `激活中继`,
    more: "更多",
    search: "搜索",

    homepage: "主页",
    follow: "关注",
    follower: "关注者",
    relay: `中继`,

    username: "用户名",
    picture: "头像",
    banner: "横幅",
    nip5: "nip5",
    submit: "提交",
    cancel: "取消",
    are_you_sure: "你确定吗？",

    hide_rules: "隐藏规则配置",
    clear_expired_cache: "清楚过期缓存",
    clear_all_caches: "清楚全部缓存",
    clear_local_storage: "清楚本地存储",
    automatic_ping: "自动ping中续",
    register_or_login: "注册或登录",
    config: "配置",
    language: "语言",
    ["login-form"]: "登录注册",
    ["relay-configuration"]: "Relay配置",
    ["login-complete"]: "完成",
    logon: "注册",
    login: "登录",
    prikey: "私钥",
    pubkey: "公钥",

    welcome: "欢迎",
    login_welcome:
      "真的很欢迎您使用我们的软件，但是，您有一件更重要的事情，您需要选择一些中继来存储您的个人数据，这通常很简单",
    configuring_relay_prompts: "配置注意",
    configuring_relay_prompts_text:
      "请配置好您的中续，您至少应该配置一条曾经用过的中继，这样才能保证可以正常的读取您的用户数据",

    synchronization_guide: "同步指导",
    synchronization_guide_text:
      "您需要做的是\n1.找到印象中自己用过的中继\n2.点击同步按钮\n",
    note: "注意",

    discard_changes0:
      " 如果您不小心点击加号，或想要放弃当前编辑配置，可以直接`",
    discard_changes1: "点击此处刷新页面",
    discard_changes2: "` ，您的修改将会放弃",

    sync_note:
      "同步不是遮盖，也不是合并，是寻找到最新的配置信息，您可以频繁点击，但默认每次开启此软件，都会自动同步一次，所以大多数情况下您不需要手动同步，您的配置将始终保持最新状态",

    configuring_a_simple_tutorial: "简单教程",
    configuring_a_simple_tutorial_text: `1. 单击加号\n2. 点击保存\n3. 点击下一步\n`,

    detailed_tutorials: "如何配置中继",
    detailed_tutorials_text: `1.可能根据网络原因，您可能需要等待十秒内的一定时间，等待下方更多中继列表更新\n2.您可以在更多中继列表里查找自己喜欢的中续，或直接使用搜索找到自己喜欢的中续\n3. 当您找到自己喜欢的中续后，您需要点击后方的 ' +' 号来添加中续\n4. 新添加的中续会进入第一个配置区，您可以点击上下箭头来更改读写情况\n5. 我们建议您配置三个中继\n6. 配置完成后点击保存\n7.如果您想要让您的好友立即找到您，只需要点击广播，来将自己所在的中继发布到更多的中续，这通常会让您的好友更容易的找到您`,
    what_is_nostr: "Nostr是什么",
    what_is_nostr_text: "Nostr是一个分布式的社交网络，客户端的传输依靠nip协议",

    empty_text: "什么都没有",
    please_configure_relay: "请配置relay",
    please_save_the_configuration: "请保存配置",
    next_step_tip: "太好了，您可以点击下一步骤了",

    published_to: "已发布到:{url}",
    not_published_to: "没有发布到:{url}",

    leave: "离开",
    join: "加入",
    loading: "加载中",
    refreshing: "刷新中",
    load_more: "加载更多",

    resource_does_not_exist: "资源不存在",
    resource_does_not_exist_description: "生活总归带点荒谬",
    i_have_saved_my_private_key_properly: "我已妥善保存私钥",
    keep_private_key_prompt:
      "请妥善保管您的私钥,一旦泄漏，您将被迫放弃此账户，也请注意，浏览器插件的安全性",
    tick_prompt: "请确认上方按钮已勾选",

    all_loading_completed: "所有消息已全部加载完成",

    lazy_delay_for_papaw: "消息泡泡的懒加载延迟",
    lazy_delay_for_papaw_tip: "设置为零等于关闭",

    sync_tooltip: "从此中继同步relay信息",
    handel_sync_on_push_message: `该中继不存在您的配置，已发布到{url}`,
    handel_sync_on_event_message: `已从{url}获取到了您的配置`,
    handel_sync_info: `已经向{url}发起同步`,

    kind: "种类",
    kind0: "用户基本数据",
    kind1: "短文本",
    kind2: "推荐继电器",
    kind3: "联系人",
    kind4: "加密的直接消息",
    kind5: "事件删除",
    kind6: "转发",
    kind7: "反应",
    kind8: "勋章",
    kind40: "频道创建",
    kind41: "频道元数据",
    kind42: "频道消息",
    kind43: "频道隐藏消息",
    kind44: "频道屏蔽用户",
    kind1984: "报告",
    kind9734: "Zap请求",
    kind9735: "赞",
    kind10000: "静音列表",
    kind10001: "引脚列表",
    kind10002: "中继列表元数据",
    kind30000: "分类人员列表",
    kind30001: "分类书签列表",
    kind30008: "个人资料徽章",
    kind30009: "徽章定义",
    kind30023: "长格式内容",
    kind30078: "应用程序特定数据",

    include_user: "包括用户",

    pull: "拉取",
    push: "推送",
    result: "结果",

    move_house_description: "将自己的数据迁移到其他中继，或备份",
    move_house: "搬家",

    add_relay: "添加中继",
    successfully_added: "添加成功",

    not_found_post: "没有找到帖子",
    not_found: "没有找到",

    enable_papaw_tree: "启用树形展示消息",
    mention: "引用",

    load_parent_success: "加载被回复者成功",
    load_parent: "加载被回复者",
    non_existent: "此事件没有回复任何事件",
    enable_papaw_tree_lazy_mode: "开启事件树的懒加载模式",

    notice: "通知",

    the_user_has_followed_you: "我关注了你",

    relay_emiter_queue_interval: "消息队列延迟",

    published_at: "发布时间",
    markdown_editor: "Markdown编辑器",
    title: "标题",
    summary: "摘要",
    edit: "编辑",

    authorized: "授权",
    authorized_form_not_floud_nostr_tip:
      "你没有安装任何的登录插件，你可以看一下以下插件之一",

    authorized_form_test_note: "可能会弹出授权请求,但不会发送任何信息",

    help: "帮助",
    help_article:
      "naddr1qq9rsetkvamxgwfkx35qz9mhwden5te0wfjkccte9ehx7um5wghxyctwvshsz8thwden5te0dehhxarj94c82c3wwajkcmr0wfjx2u3wdejhgqgewaehxw309ahx7um5wgh8q6twddsku6mf9ehhyee0qy08wumn8ghj7un9d3shjtnwdaehgu3wwa5hyetydejhgtn2wqhszxmhwden5te0dehhxarj9e3xjarrda5kutfjxyhx7un89uq32amnwvaz7tmxd9shger9de5k2u3wvdhk6tcpp4mhxue69uhkummn9ekx7mqpzpmhxue69uhkumedwd68ytn0wfnszxrhwden5te0d35kw6r5de5kuemjv4kxz7fwvdhk6qgnwaehxw309aex2mrp09skymr99ehhyeczyqrklt56qgr88jhemdn8xjyy4f980aym5w2zwjykusu7r3hlz7pgjqcyqqq823crzj7e3",

    mute_user: "加入黑名单",
    already_pinned_tip: "您已经固定了此消息",
    request_initiated: "已经发起请求",

    pin: "固定",
    unpin: "取消固定",
    not_asking_anymore: "不再提醒",
    allow: "允许",
    refuse: "拒绝",
    device_pubkey: "设备公钥",
    nostr_connect: "远程授权",

    nostr_connect_tip: `你需要在你的另一设备上点击确定连接，确保上方的设备公钥与请求连接的设备公钥相同`,
    you_have_sent_a_delete_request: `您已经发送了删除请求`,

    minutes: "分钟",
    day: "天",

    describe: "描述",
    get_public_key: "获取公钥",
    sign_event: "签名事件",
    connect: "连接",
    disconnect: "断开",
    delegate: "事件委托",
    get_relays: "获取中继",
    nip04_encrypt: "加密",
    nip04_decrypt: "解秘",

    want_to_encrypt_the_following_content: "想要加密以下内容:",
    send_to: `发送给:`,
    want_to_decrypt_the_following_content: "想要解密已下内容:",
    sender: "发送者:",

    want_to_obtain_your_public_key: "想要获取您的公钥",
    want_to_sign_the_following_event: "想要签名以下事件:",
    want_to_obtain_your_relays: "想要获取您的Relays",
    want_to_establish_a_connection_with_you: `想要与您建立连接`,
    want_to_obtain_descriptive_information: "想要获取接口信息",

    deny_authorization: "拒绝授权",
    NotFoundError: "没有找到Nostr API!",
    parse: "解析",
    delete: "删除",

    language_settings: "语言设置",
    pay: "支付",

    //message
    relay_configurator_save_message:
      "你的中继信息已保存到本地，正在准备上传，您可以继续您的其他操作",
    relay_configurator_sync_message:
      "同步已经开始了，将试图更新中继中的旧数据和，从中续中找到最新的配置",
    broadcast_error_message: "请求失败，您可能需要先配置一下列表",
    relay_info_view_verified: `代理需要验证，你可以点击确认后，然后点击"Request temporary access to the demo server"按钮完成验证，如果界面发生改变请根据提示操作，或反馈`,
    logout_dialog_content: `确认退出登录吗？您是否确认已经备份私钥?如果您没有备份私钥，您将再也无法登录此账户`,
    not_implemented: "目前没有实现此功能",
    clear_local_storage_warning:
      "您确定要清理localStorage吗？localStorage是浏览器提供的本地存储，您需要备份一下私钥和稍微记忆一下中续",
    cleanup_succeeded: "清理成功",
    incorrect_lightning_address: "闪电地址不正确",
    payment_failed: "支付失败",
    failed_to_generate_invoice: "生成发票失败",

    //dialog
    do_you_want_to_discard_the_changes: `您要放弃修改吗？`,

    //tips
    current_number_of_subscriptions_including_temporary_subscriptions:
      "当前订阅数，包括临时订阅",
    number_of_current_and_continued_connections: `当前与中续的连接数量`,
    currently_not_modified: `当前没有修改`,
    relay_configurator_save_changes:
      "保存是保存修改的意思，有修改行为需要保存，同步不会保存数据",
    relay_configurator_sync_has_change_tip: `当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新`,
    relay_configurator_sync_no_change_tip: `当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新`,
    broadcast_has_change_tip: `当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新页面`,
    broadcast_no_change_tip: `将自己的联系方式广泛发布，可帮助别人更容易找到自己`,
  },
};

export default message;
const xx =
  '{"en-US":"English","zh-CN":"中文","US":"America","CN":"中国","did_not_follow_anyonew":"你没有关注任何人","my_feed":"关注","You can\'t find anything":"You can\'t find anything","global":"全局","home":"首页","profile":"我的","relays":"中继","channel":"频道","task":"任物","settings":"设置","about":"关于","logout":"注销","dark":"深色","bright":"亮色","send":"发送","rich_text_edit_box_input_placeholder":"你能尝试输入一些内容","previous_step":"上一步","next_step":"下一步","complete":"完成","yes":"确定","no":"取消","success":"成功","warning":"警告","error":"错误","info":"消息","edit_user_profile":"编辑用户资料","copy":"复制","metadata":"元数据","recommend":"推荐","recommend_event":"推荐事件","recommend_user":"推荐用户","recommend_metadata":"推荐用户元数据","hide_list":"隐藏列表","copy_succeeded":"复制成功:{text}","close":"关闭","delete_event":"删除消息","hide":"隐藏","open":"打开","reply":"回复","relay_configuration":"中继配置","save":"保存","sync":"同步","broadcast":"广播","success_timeout_failure_total":"成功/超时/失败/总数","add":"添加","x_seconds_ago":"{x}秒前","x_minutes_ago":"{x}分钟前","x_hours_ago":"{x}小时前","active_relay":"激活中继","more":"更多","search":"搜索","homepage":"主页","follow":"关注","follower":"关注者","relay":"中继","username":"用户名","picture":"头像","banner":"横幅","nip5":"nip5","submit":"提交","cancel":"取消","are_you_sure":"你确定吗？","hide_rules":"隐藏规则配置","clear_expired_cache":"清楚过期缓存","clear_all_caches":"清楚全部缓存","clear_local_storage":"清楚本地存储","automatic_ping":"自动ping中续","register_or_login":"注册或登录","config":"配置","language":"语言","login-form":"登录注册","relay-configuration":"Relay配置","login-complete":"完成","logon":"注册","login":"登录","prikey":"私钥","pubkey":"公钥","welcome":"欢迎","login_welcome":"真的很欢迎您使用我们的软件，但是，您有一件更重要的事情，您需要选择一些中继来存储您的个人数据，这通常很简单","configuring_relay_prompts":"配置注意","configuring_relay_prompts_text":"请配置好您的中续，您至少应该配置一条曾经用过的中继，这样才能保证可以正常的读取您的用户数据","synchronization_guide":"同步指导","synchronization_guide_text":"您需要做的是\\n1.找到印象中自己用过的中继\\n2.点击同步按钮\\n","note":"注意","discard_changes0":" 如果您不小心点击加号，或想要放弃当前编辑配置，可以直接`","discard_changes1":"点击此处刷新页面","discard_changes2":"` ，您的修改将会放弃","sync_note":"同步不是遮盖，也不是合并，是寻找到最新的配置信息，您可以频繁点击，但默认每次开启此软件，都会自动同步一次，所以大多数情况下您不需要手动同步，您的配置将始终保持最新状态","configuring_a_simple_tutorial":"简单教程","configuring_a_simple_tutorial_text":"1. 单击加号\\n2. 点击保存\\n3. 点击下一步\\n","detailed_tutorials":"如何配置中继","detailed_tutorials_text":"1.可能根据网络原因，您可能需要等待十秒内的一定时间，等待下方更多中继列表更新\\n2.您可以在更多中继列表里查找自己喜欢的中续，或直接使用搜索找到自己喜欢的中续\\n3. 当您找到自己喜欢的中续后，您需要点击后方的 \' +\' 号来添加中续\\n4. 新添加的中续会进入第一个配置区，您可以点击上下箭头来更改读写情况\\n5. 我们建议您配置三个中继\\n6. 配置完成后点击保存\\n7.如果您想要让您的好友立即找到您，只需要点击广播，来将自己所在的中继发布到更多的中续，这通常会让您的好友更容易的找到您","what_is_nostr":"Nostr是什么","what_is_nostr_text":"Nostr是一个分布式的社交网络，客户端的传输依靠nip协议","empty_text":"什么都没有","please_configure_relay":"请配置relay","please_save_the_configuration":"请保存配置","next_step_tip":"太好了，您可以点击下一步骤了","published_to":"已发布到:{url}","not_published_to":"没有发布到:{url}","leave":"离开","join":"加入","loading":"加载中","refreshing":"刷新中","load_more":"加载更多","resource_does_not_exist":"资源不存在","resource_does_not_exist_description":"生活总归带点荒谬","i_have_saved_my_private_key_properly":"我已妥善保存私钥","keep_private_key_prompt":"请妥善保管您的私钥,一旦泄漏，您将被迫放弃此账户，也请注意，浏览器插件的安全性","tick_prompt":"请确认上方按钮已勾选","all_loading_completed":"所有消息已全部加载完成","lazy_delay_for_papaw":"消息泡泡的懒加载延迟","lazy_delay_for_papaw_tip":"设置为零等于关闭","sync_tooltip":"从此中继同步relay信息","handel_sync_on_push_message":"该中继不存在您的配置，已发布到{url}","handel_sync_on_event_message":"已从{url}获取到了您的配置","handel_sync_info":"已经向{url}发起同步","kind":"种类","kind0":"用户基本数据","kind1":"短文本","kind2":"推荐继电器","kind3":"联系人","kind4":"加密的直接消息","kind5":"事件删除","kind6":"转发","kind7":"反应","kind8":"勋章","kind40":"频道创建","kind41":"频道元数据","kind42":"频道消息","kind43":"频道隐藏消息","kind44":"频道屏蔽用户","kind1984":"报告","kind9734":"Zap请求","kind9735":"赞","kind10000":"静音列表","kind10001":"引脚列表","kind10002":"中继列表元数据","kind30000":"分类人员列表","kind30001":"分类书签列表","kind30008":"个人资料徽章","kind30009":"徽章定义","kind30023":"长格式内容","kind30078":"应用程序特定数据","include_user":"包括用户","pull":"拉取","push":"推送","result":"结果","move_house_description":"将自己的数据迁移到其他中继，或备份","move_house":"搬家","add_relay":"添加中继","successfully_added":"添加成功","not_found":"没有找到帖子","enable_papaw_tree":"启用树形展示消息","mention":"引用","load_parent_success":"加载被回复者成功","load_parent":"加载被回复者","non_existent":"此事件没有回复任何事件","enable_papaw_tree_lazy_mode":"开启事件树的懒加载模式","notice":"通知","the_user_has_followed_you":"我关注了你","relay_emiter_queue_interval":"消息队列延迟","published_at":"发布时间","markdown_editor":"Markdown编辑器","title":"标题","summary":"摘要","edit":"编辑","authorized":"授权","authorized_form_not_floud_nostr_tip":"你没有安装任何的登录插件，你可以看一下以下插件之一","authorized_form_test_note":"可能会弹出授权请求,但不会发送任何信息","help":"帮助","help_article":"naddr1qq9rsetkvamxgwfkx35qz9mhwden5te0wfjkccte9ehx7um5wghxyctwvshsz8thwden5te0dehhxarj94c82c3wwajkcmr0wfjx2u3wdejhgqgewaehxw309ahx7um5wgh8q6twddsku6mf9ehhyee0qy08wumn8ghj7un9d3shjtnwdaehgu3wwa5hyetydejhgtn2wqhszxmhwden5te0dehhxarj9e3xjarrda5kutfjxyhx7un89uq32amnwvaz7tmxd9shger9de5k2u3wvdhk6tcpp4mhxue69uhkummn9ekx7mqpzpmhxue69uhkumedwd68ytn0wfnszxrhwden5te0d35kw6r5de5kuemjv4kxz7fwvdhk6qgnwaehxw309aex2mrp09skymr99ehhyeczyqrklt56qgr88jhemdn8xjyy4f980aym5w2zwjykusu7r3hlz7pgjqcyqqq823crzj7e3","mute_user":"加入黑名单","already_pinned_tip":"您已经固定了此消息","request_initiated":"已经发起请求","pin":"固定","unpin":"取消固定","not_asking_anymore":"不再提醒","allow":"允许","refuse":"拒绝","device_pubkey":"设备公钥","nostr_connect":"远程授权","nostr_connect_tip":"你需要在你的另一设备上点击确定连接，确保上方的设备公钥与请求连接的设备公钥相同","you_have_sent_a_delete_request":"您已经发送了删除请求","minutes":"分钟","day":"天","describe":"描述","get_public_key":"获取公钥","sign_event":"签名事件","connect":"连接","disconnect":"断开","delegate":"事件委托","get_relays":"获取中继","nip04_encrypt":"加密","nip04_decrypt":"解秘","want_to_encrypt_the_following_content":"想要加密以下内容:","send_to":"发送给:","want_to_decrypt_the_following_content":"想要解密已下内容:","sender":"发送者:","want_to_obtain_your_public_key":"想要获取您的公钥","want_to_sign_the_following_event":"想要签名以下事件:","want_to_obtain_your_relays":"想要获取您的Relays","want_to_establish_a_connection_with_you":"想要与您建立连接","want_to_obtain_descriptive_information":"想要获取接口信息","deny_authorization":"拒绝授权","NotFoundError":"没有找到Nostr API!","relay_configurator_save_message":"你的中继信息已保存到本地，正在准备上传，您可以继续您的其他操作","relay_configurator_sync_message":"同步已经开始了，将试图更新中继中的旧数据和，从中续中找到最新的配置","broadcast_error_message":"请求失败，您可能需要先配置一下列表","relay_info_view_verified":"代理需要验证，你可以点击确认后，然后点击\\"Request temporary access to the demo server\\"按钮完成验证，如果界面发生改变请根据提示操作，或反馈","logout_dialog_content":"确认退出登录吗？您是否确认已经备份私钥?如果您没有备份私钥，您将再也无法登录此账户","not_implemented":"目前没有实现此功能","clear_local_storage_warning":"您确定要清理localStorage吗？localStorage是浏览器提供的本地存储，您需要备份一下私钥和稍微记忆一下中续","cleanup_succeeded":"清理成功","current_number_of_subscriptions_including_temporary_subscriptions":"当前订阅数，包括临时订阅","number_of_current_and_continued_connections":"当前与中续的连接数量","currently_not_modified":"当前没有修改","relay_configurator_save_changes":"保存是保存修改的意思，有修改行为需要保存，同步不会保存数据","relay_configurator_sync_has_change_tip":"当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新","relay_configurator_sync_no_change_tip":"当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新","broadcast_has_change_tip":"当前已有数据更改，您应该点击保存，如果您不希望保存，您应该刷新页面","broadcast_no_change_tip":"将自己的联系方式广泛发布，可帮助别人更容易找到自己"}';

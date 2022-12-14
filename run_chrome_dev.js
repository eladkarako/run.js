module.exports = {
   command : "./application/chrome.exe"
  ,args    :  
[
 "--flag-switches-begin"
,"--user-data-dir=" + process.cwd() + "\\profile"
,"--no-default-browser-check"
,"--ignore-autocomplete-off-autofill"
,"--allow-outdated-plugins"
,"--disable-logging"
,"--disable-breakpad"
,"--disable-crash-reporter"
,"--crash-server-url=\"https:\/\/0.0.0.0\/\""
,"--no-pings"
,"--force-device-scale-factor=\"1.65\""
,"--pull-to-refresh=0"
,"--start-maximized"
,"--enable-password-generation"
,"--enable-clear-hevc-for-testing"
,"--autoplay-policy=document-user-activation-required"
,"--enable-features=" + `
PlatformHEVCDecoderSupport
,ParallelDownloading
,DownloadRange
,OmniboxActiveSearchEngines
,OmniboxMaxURLMatches:OmniboxMaxURLMatches/6
,OmniboxMaxZeroSuggestMatches:MaxZeroSuggestMatches/15
,OmniboxRichAutocompletion:RichAutocompletionAutocompletePreferUrlsOverPrefixes/true
,OmniboxRichAutocompletion:RichAutocompletionAutocompleteTitles/true/RichAutocompletionAutocompleteNonPrefixAll/true
,OmniboxRichAutocompletion:RichAutocompletionSplitTitleCompletion/true/RichAutocompletionSplitUrlCompletion/true/RichAutocompletionSplitCompletionMinChar/2
,OmniboxUIExperimentMaxAutocompleteMatches:UIMaxAutocompleteMatches/12
,PasswordImport
,PasswordExport
,PassiveDocumentEventListeners
,PassiveEventListenersDueToFling
,IdleTimeSpellChecking
,BackForwardCache:TimeToLiveInBackForwardCacheInSeconds/300/should_ignore_blocklists/true/enable_same_site/true
,LazyFrameLoading:automatic-lazy-load-frames-enabled/true/restrict-lazy-load-frames-to-data-saver-only/false
,LazyImageLoading:automatic-lazy-load-images-enabled/true/restrict-lazy-load-images-to-data-saver-only/false
`.replace(/[\r\n]/gm,"")

,"--disable-features=" + `
DownloadBubble
,MediaEngagementBypassAutoplayPolicies
,UseChromeOSDirectVideoDecoder
,ChromeLabs
,SidePanel
,side-panel
,sidepanel
,enable-side-panel=false
`.replace(/[\r\n]/gm,"")

,"--disable-side-panel"
,"--passive-listeners-default=forcealltrue"
,"--force-ui-direction=ltr"
,"--disable-quic"
,"--blink-settings=" + `
disallowFetchForDocWrittenScriptsInMainFrame=false
,IdleTimeSpellChecking=enabled
,enable-side-panel=false
,UnifiedSidePanel=false
`.replace(/[\r\n]/gm,"")

,"--unified-side-panel=false"
,"--disable-unified-side-panel"
,"--enable-unified-side-panel=false"
,"--enable-side-panel=false"
,"--force-color-profile=srgb"
,"--enable-async-image-decoding"
,"--enable-experimental-web-platform-features"
,"--flag-switches-end"
]

,spawn_options : {
   "stdio"                     : "ignore"
  ,"detached"                  : true
  ,"shell"                     : false
  ,"windowsVerbatimArguments"  : false
  ,"windowsHide"               : true
  ,"timeout"                   : undefined
  }
}

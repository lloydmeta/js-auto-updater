// An object that looks at the
// "Application-Version" header of Ajax responses
// If it is different from the one that is stored, refreshes the page
// NOTE: has jQuery as a dependency

var ClientAutoUpdater = {

  initialize: function(options){
    this.latestStoredClientVersionLSKey = options.localStorageClientVersionKey;
    this.currentClientVersion = this.getStoredClientVersion();
  },

  setMonitor: function(options){
    //set some default options
    if (typeof(options)==='undefined') options = {};
    $.extend(options, {localStorageClientVersionKey: 'latest_stored_client_version'});
    this.initialize(options);
    this.setAjaxPrefilter();
  },

  setAjaxPrefilter: function(){

    var that = this;

    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      if (! originalOptions.isInternetCheck){
        // capture the original .success function
        originalOptions._success = originalOptions.success;

        // overwrite success handler for current request
        options.success = function( _data, _textStatus, _jqXHR){
          var newestClientVersion = _jqXHR.getResponseHeader("Application-Version");
          if (newestClientVersion && that.shouldReloadOrUpdateStoredVersion(newestClientVersion)) {
             that.reloadPage();
          }

          // No need to refresh the page, simply hand off to originalOptions._done
          if(originalOptions._success) originalOptions._success( _data, _textStatus, _jqXHR);
          return;
        }
      }
    });
  },

  hasInternet: function(){
    var s = $.ajax({
        isInternetCheck: true,
        type: "HEAD",
        url: window.location.href.split("?")[0] + "?" + Math.random(),
        async: false
    }).status;
    console.log("Internet status: " +s);
    //thx http://www.louisremi.com/2011/04/22/navigator-online-alternative-serverreachable/
    return s >= 200 && s < 300 || s === 304;
  },

  getStoredClientVersion: function(){
    try {
      return localStorage.getItem(this.latestStoredClientVersionLSKey);
    }
    catch(e){
      return null;
    };
  },

  setStoredClientVersion: function(newestClientVersion){
    this.currentClientVersion = newestClientVersion;
    localStorage.setItem(this.latestStoredClientVersionLSKey, newestClientVersion)  ;
  },

  shouldReloadOrUpdateStoredVersion: function(newestClientVersion){
    if (this.currentClientVersion){
      if (this.currentClientVersion != newestClientVersion && this.hasInternet()){
        this.setStoredClientVersion(newestClientVersion);
        console.log("Time to reload !");
        return true;
      }else{
        return false;
      }
    }else{
      this.setStoredClientVersion(newestClientVersion);
      return false;
    }
  },

  reloadPage: function(){
    location.reload(true);
  }

}
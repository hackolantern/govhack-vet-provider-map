function AppService(options) {
    var _this = this;
    
    var encodeOccupationQuery = function(text) {
        return encodeURIComponent("\"job_name\" LIKE '%" + text + "%'");
    };
    var encodeCourseQuery = function(text) {
        return encodeURIComponent("\"Course Title\" LIKE '%" + text + "%'");
    };
    
    _this.PerformSearch = function(text) {
        var occQuery = $.getJSON(options.restUrl + "/data/govhack/vet/occupations/.json?filter=" + encodeOccupationQuery(text));
        var crsQuery = $.getJSON(options.restUrl + "/data/govhack/vet/courses/.json?filter=" + encodeCourseQuery(text));
        return $.when(occQuery, crsQuery);
    };
}

function HomeViewModel() {
    this.Title = "Home";
    this.TemplateName = "home-template";
}

function SearchResultsViewModel(occResults, crsResults) {
    var _this = this;
    _this.Title = "Search Resuts";
    _this.TemplateName = "search-results-template";
    _this.OccupationResults = ko.observableArray(occResults.features || []);
    _this.CourseResults = ko.observableArray(crsResults.features || []);
}

function SearchViewModel(parentVm) {
    var _this = this;
    
    _this.SearchText = ko.observable("");
    _this.PerformSearch = function() {
        parentVm.IsBusy(true);
        parentVm.Service.PerformSearch(_this.SearchText()).then(function(occResult, crsResult) {
            var occResults = occResult[0];
            var crsResults = crsResult[0];
            parentVm.Sidebar(new SearchResultsViewModel(occResults, crsResults));
        }).fail(function() {
            alert("Search Error");
        }).always(function() {
            parentVm.RevealSidebar();
            parentVm.IsBusy(false);
        });
    };
}

function AppViewModel(appService) {
    this.IsBusy = ko.observable(false);
    this.Search = new SearchViewModel(this);
    this.Sidebar = ko.observable(new HomeViewModel());
    this.Service = appService;
    this.RevealSidebar = function() {
        if (!$(".sidebar-container").is(".slide-in"))
            $(".navbar-toggle")[0].click();
    };
    this.HideSidebar = function() {
        if ($(".sidebar-container").is(".slide-in"))
            $(".navbar-toggle")[0].click();
    };
}
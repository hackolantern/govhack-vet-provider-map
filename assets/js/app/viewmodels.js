function AppService(options) {
    var _this = this;
    
    var encodeOccupationQuery = function(text) {
        return encodeURIComponent("\"job_name\" LIKE '%" + text + "%'");
    };
    var encodeCourseQuery = function(text) {
        return encodeURIComponent("\"Course Title\" LIKE '%" + text + "%'");
    };
    var encodeProviderQuery = function (text) {
        return encodeURIComponent("Name LIKE '%" + text + "%'")
    }
    
    _this.PerformSearch = function(text, searchType) {
        switch (searchType)
        {
            case "occupations":
                return $.getJSON(options.restUrl + "/data/govhack/vet/occupations/.json?filter=" + encodeOccupationQuery(text));
            case "courses":
                return $.getJSON(options.restUrl + "/data/govhack/vet/courses/.json?filter=" + encodeCourseQuery(text));
            case "providers":
                return $.getJSON(options.restUrl + "/data/govhack/vet/providers/.json?filter=" + encodeProviderQuery(text));
            default:
                throw "Unsupported search type";
        }
    };
}

function HomeViewModel() {
    this.Title = "Home";
    this.TemplateName = "home-template";
}

function SearchResultsViewModel(results) {
    var _this = this;
    _this.Title = "Search Resuts";
    _this.TemplateName = "search-results-template";
    _this.OccupationResults = ko.observableArray(occResults.features || []);
    _this.CourseResults = ko.observableArray(crsResults.features || []);
}

function CourseProviderListViewModel() {
    
}

function CourseOccupationListViewModel() {
    
}

function CourseListViewModel(results) {
    var _this = this;
    _this.Title = "Course Search Results (" + results.features.length + ")";
    _this.TemplateName = "course-list-template";
    
    _this.Results = ko.observableArray(results.features);
}

function OccupationListViewModel(results) {
    var _this = this;
    _this.Title = "Occupation Search Results (" + results.features.length + ")";
    _this.TemplateName = "occupation-list-template";
    
    _this.Results = ko.observableArray(results.features);
}

function ProviderListViewModel(results) {
    var _this = this;
    _this.Title = "Provider Search Results (" + results.features.length + ")";
    _this.TemplateName = "provider-list-template";
    
    _this.Results = ko.observableArray(results.features);
}

function SearchViewModel(parentVm) {
    var _this = this;
    
    _this.SearchType = ko.observable("courses");
    _this.SearchTypes = ["courses", "providers", "occupations"];
    _this.SearchText = ko.observable("");
    _this.PerformSearch = function() {
        parentVm.IsBusy(true);
        var stype = _this.SearchType();
        parentVm.Service.PerformSearch(_this.SearchText(), stype).then(function(result) {
            switch (stype) {
                case "courses":
                    parentVm.Sidebar(new CourseListViewModel(result));
                    break;
                case "occupations":
                    parentVm.Sidebar(new OccupationListViewModel(result));
                    break;
                case "providers":
                    parentVm.Sidebar(new ProviderListViewModel(result));
                    break;
            }
        }).fail(function() {
            alert("Search Error");
        }).always(function() {
            parentVm.RevealSidebar();
            parentVm.IsBusy(false);
        });
    };
}

function AppViewModel(map, appService) {
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
    this.ZoomToLonLat = function(lon, lat) {
        //HACK: It's prematurely called as part of data-binding, but it should
        //be busy at this point so deny any zoom requests
        if (this.IsBusy())
            return;
            
        var view = map.getView();
        view.setCenter(ol.proj.transform([lon, lat], "EPSG:4326", "EPSG:3857"));
        view.setZoom(17);
    };
}
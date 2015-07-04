function AppService(options) {
    var _this = this;
    
    var encodeOccupationQuery = function(text) {
        return text;
    };
    var encodeCourseQuery = function(text) {
        return text;
    };
    
    _this.PerformSearch = function(text) {
        var occQuery = $.getJSON(options.restUrl + "data/govhack/vet/occupations.json?filter=" + text);
        var crsQuery = $.getJSON(options.restUrl + "data/govhack/vet/courses.json?filter=" + text);
        return occQuery.then(crsQuery);
    };
}

function HomeViewModel() {
    this.TemplateName = "home-template";
}

function SearchViewModel(parentVm) {
    var _this = this;
    
    _this.OccupationResults = ko.observableArray([]);
    _this.CourseResults = ko.observableArray([]);
    
    _this.SearchText = ko.observable("");
    _this.PerformSearch = function() {
        parentVm.IsBusy(true);
        parentVm.Service.PerformSearch(_this.SearchText()).then(function(resp) {
            debugger;
            alert("Searching for: " + _this.SearchText());
        }).always(function() {
            alert("Search error");
            parentVm.IsBusy(false);
        });
    };
}

function AppViewModel(appService) {
    this.IsBusy = ko.observable(false);
    this.Search = new SearchViewModel(this);
    this.Sidebar = ko.observable(new HomeViewModel());
    this.Service = new AppService();
}
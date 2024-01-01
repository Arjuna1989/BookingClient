var directives;
(function (directives) {
    var support;
    (function (support) {
        var DateFormat = /** @class */ (function () {
            function DateFormat($filter) {
                this.require = "ngModel";
                this.link = function (scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function (data) {
                        //convert data from view format to model format
                        return new Date(data).toLocaleDateString(); //converted
                    });
                    ngModel.$formatters.push(function (data) {
                        //convert data from model format to view format
                        var dateFormat = "dd/MMM/yyyy";
                        var pDate = Date.parse(data);
                        var result = "";
                        if (data) {
                            result = $filter("date")(new Date(pDate), dateFormat);
                        }
                        return result;
                    });
                };
            }
            DateFormat.Factory = function () {
                var directive = function ($filter) {
                    return new DateFormat($filter);
                };
                return directive;
            };
            return DateFormat;
        }());
        support.DateFormat = DateFormat;
    })(support = directives.support || (directives.support = {}));
})(directives || (directives = {}));
//# sourceMappingURL=booking.directives.dateFormat.js.map

module directives.support {
    export class DateFormat implements ng.IDirective {

        public link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => void;
        public require = "ngModel";

        constructor($filter: ng.IFilterService) {
            this.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: ng.INgModelController) => {
                ngModel.$parsers.push(function (data) {
                    //convert data from view format to model format

                    return new Date(data).toLocaleDateString();//converted
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

        public static Factory(): ng.IDirectiveFactory {
            var directive = ($filter: ng.IFilterService) => {
                return new DateFormat($filter);

            }
            return directive;
        }
    }
}
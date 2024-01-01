#region Using

using System.Web.Optimization;

#endregion

namespace CommercePromote.BookingClient
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StyleBundle("~/content/vendor").IncludeDirectory("~/content/css", "*.min.css"));

            bundles.Add(new ScriptBundle("~/scripts/vendor").Include(
                "~/content/js/app.config.js",
                "~/content/js/plugin/jquery-touch/jquery.ui.touch-punch.min.js",
                "~/content/js/angular/angular.min.js",
                "~/content/js/bootstrap/bootstrap.min.js",
                "~/content/js/notification/SmartNotification.min.js",
                "~/content/js/vendorwidgets/jarvis.widget.min.js",
                "~/content/js/plugin/jquery-validate/jquery.validate.min.js",
                "~/content/js/plugin/masked-input/jquery.maskedinput.min.js",
                "~/content/js/plugin/select2/select2.min.js",
                "~/content/js/plugin/bootstrap-slider/bootstrap-slider.min.js",
                "~/content/js/plugin/bootstrap-datepicker/bootstrap-datepicker.min.js",
                "~/content/js/plugin/bootstrap-progressbar/bootstrap-progressbar.min.js",
                "~/content/js/plugin/msie-fix/jquery.mb.browser.min.js",
                "~/content/js/plugin/fastclick/fastclick.min.js",
                "~/content/js/app.min.js"));

            bundles.Add(new ScriptBundle("~/scripts/full-calendar").Include(
                "~/content/js/plugin/moment/moment.min.js",
                "~/content/js/plugin/fullcalendar/jquery.fullcalendar.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/charts").Include(
                "~/content/js/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js",
                "~/content/js/plugin/sparkline/jquery.sparkline.min.js",
                "~/content/js/plugin/morris/morris.min.js",
                "~/content/js/plugin/morris/raphael.min.js",
                "~/content/js/plugin/flot/jquery.flot.cust.min.js",
                "~/content/js/plugin/flot/jquery.flot.resize.min.js",
                "~/content/js/plugin/flot/jquery.flot.time.min.js",
                "~/content/js/plugin/flot/jquery.flot.fillbetween.min.js",
                "~/content/js/plugin/flot/jquery.flot.orderBar.min.js",
                "~/content/js/plugin/flot/jquery.flot.pie.min.js",
                "~/content/js/plugin/flot/jquery.flot.tooltip.min.js",
                "~/content/js/plugin/dygraphs/dygraph-combined.min.js",
                "~/content/js/plugin/chartjs/chart.min.js",
                "~/content/js/plugin/highChartCore/highcharts-custom.min.js",
                "~/content/js/plugin/highchartTable/jquery.highchartTable.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/datatables").Include(
                "~/content/js/plugin/datatables/jquery.dataTables.min.js",
                "~/content/js/plugin/datatables/dataTables.colVis.min.js",
                "~/content/js/plugin/datatables/dataTables.tableTools.min.js",
                "~/content/js/plugin/datatables/dataTables.bootstrap.min.js",
                "~/content/js/plugin/datatable-responsive/datatables.responsive.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/jq-grid").Include(
                "~/content/js/plugin/jqgrid/jquery.jqGrid.min.js",
                "~/content/js/plugin/jqgrid/grid.locale-en.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/forms").Include(
                "~/content/js/plugin/jquery-form/jquery-form.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/vendor-chat").Include(
                "~/content/js/vendor-chat-ui/smart.chat.ui.min.js",
                "~/content/js/vendor-chat-ui/smart.chat.manager.min.js"
                ));

            bundles.Add(new ScriptBundle("~/scripts/vector-map").Include(
                "~/content/js/plugin/vectormap/jquery-jvectormap-1.2.2.min.js",
                "~/content/js/plugin/vectormap/jquery-jvectormap-world-mill-en.js"
                ));



            BundleTable.EnableOptimizations = true;
        }
    }
}
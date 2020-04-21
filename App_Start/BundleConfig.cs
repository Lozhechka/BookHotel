using System.Web;
using System.Web.Optimization;

namespace BookHotel
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/popper.js",
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(

                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css"));

            bundles.Add(new StyleBundle("~/Content/index/css").Include(
                "~/Content/css/bootstrap-grid.css",
                "~/Content/css/bootstrap.min.css",
                "~/Content/css/styles_index.css",
                "~/Content/font/all.min.css"
                ));
            bundles.Add(new StyleBundle("~/Content/contact/css").Include(
                "~/Content/css/bootstrap-grid.css",
                "~/Content/css/bootstrap.min.css",
                "~/Content/css/contact.css",
                "~/Content/font/all.min.css"));

            bundles.Add(new StyleBundle("~/Content/signin/css").Include(
                "~/Content/css/bootstrap-grid.css",
                "~/Content/css/bootstrap.min.css",
                "~/Content/css/signin.css",
                "~/Content/font/all.min.css"));

            bundles.Add(new StyleBundle("~/Content/reservation/css").Include(
                //"~/Content/css/bootstrap.min.css",
                "~/Content/css/global.css",
                "~/Content/css/colour-blue.css",
                "~/Content/font/all.min.css"));
        }
    }
}

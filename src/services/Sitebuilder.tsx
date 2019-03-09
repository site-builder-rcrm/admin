import Jquery from "jquery";
import qs from "querystring";

class Sitebuilder {
  public Servers: {
    List: () => JQuery.Promise<any>;
    Create: (serverData: any) => JQuery.Promise<any>;
    Archive: (siteId: string) => JQuery.Promise<any>;
  };
  public Funnels: {
    List: () => JQuery.Promise<any>;
    Get: (funnelId: any) => JQuery.Promise<any>;
    Create: (funnelData: any) => JQuery.Promise<any>;
    Update: (funnelId: string, funnelData: any) => JQuery.Promise<any>;
    Archive: (funnelId: string) => JQuery.Promise<any>;
  };
  public Response: {
    ListSites: () => JQuery.Promise<any>;
    ListProducts: (siteId: string) => JQuery.Promise<any>;
  };
  public Settings: {
    Get: () => JQuery.Promise<any>;
    Update: (settings: any) => JQuery.Promise<any>;
  };
  public Logout: () => JQuery.Promise<any>;
  public GetUser: () => JQuery.Promise<any>;
  public Login: (username: string, password: string) => JQuery.Promise<any>;

  constructor(defaultOptions: any) {
    this.Login = (username: string, password: string) => {
      const data = qs.stringify({
        login: username,
        password
      });
      return Jquery.ajax({
        ...defaultOptions,
        type: "POST",
        url: "https://api.rcrm-site-builder.com/auth/",
        data,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
      });
    };

    this.GetUser = () => {
      return Jquery.ajax({
        ...defaultOptions,
        type: "GET",
        url: "https://api.rcrm-site-builder.com/auth/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
      });
    };

    this.Logout = () => {
      return Jquery.ajax({
        ...defaultOptions,
        type: "DELETE",
        url: "https://api.rcrm-site-builder.com/auth/logout/",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8"
      });
    };

    this.Settings = {
      Get: () => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/settings/"
        });
      },
      Update: (settings: any) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "POST",
          url: "https://api.rcrm-site-builder.com/settings/",
          data: settings
        });
      }
    };

    this.Response = {
      ListSites: () => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/response/sites/"
        });
      },
      ListProducts: (siteId: string) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url:
            "https://api.rcrm-site-builder.com/response/products:" +
            siteId +
            "/"
        });
      }
    };

    this.Servers = {
      List: () => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/server/"
        }).then(response => {
          return JSON.parse(response);
        });
      },
      Create: (serverData: any) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "POST",
          url: "https://api.rcrm-site-builder.com/server/",
          data: serverData
        }).then(response => {
          console.log("RAW RESPONSE", response);
          return JSON.parse(response);
        });
      },
      Archive: (siteId: string) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "DELETE",
          url: "https://api.rcrm-site-builder.com/server/" + siteId + "/"
        });
      }
    };

    this.Funnels = {
      List: () => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/funnel/"
        }).then(response => {
          return JSON.parse(response);
        });
      },
      Get: (funnelId: string) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/funnel/" + funnelId + "/"
        }).then(response => {
          return JSON.parse(response);
        });
      },
      Create: (funnelData: any) => {
        var data = {
          name: funnelData.name,
          json: JSON.stringify(funnelData)
        };
        return Jquery.ajax({
          ...defaultOptions,
          type: "POST",
          url: "https://api.rcrm-site-builder.com/funnel/",
          data: data
        }).then(response => {
          return JSON.parse(response);
        });
      },
      Update: (funnelId: string, funnelData: any) => {
        var data = {
          name: funnelData.name,
          json: JSON.stringify(funnelData)
        };
        return Jquery.ajax({
          ...defaultOptions,
          type: "POST",
          url: "https://api.rcrm-site-builder.com/funnel/" + funnelId + "/",
          data: data
        }).then(response => {
          return JSON.parse(response);
        });
      },
      Archive: (funnelId: string) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "DELETE",
          url: "https://api.rcrm-site-builder.com/funnel/" + funnelId + "/"
        });
      }
    };
  }
}

export default new Sitebuilder({
  json: true,
  traditional: true,
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

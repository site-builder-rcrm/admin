import Jquery from "jquery";
import qs from "querystring";

class Sitebuilder {
  public Servers: {
    List: () => JQuery.Promise<any>;
    Create: (serverData: any) => JQuery.Promise<any>;
  };
  public Response: {
    GetKey: () => JQuery.Promise<any>;
    UpdateKey: (key: string) => JQuery.Promise<any>;
    ListSites: (key: string) => JQuery.Promise<any>;
    ListProducts: (key: string, siteId: string) => JQuery.Promise<any>;
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

    this.Response = {
      GetKey: () => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/response/"
        });
      },
      UpdateKey: (key: string) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/response/" + key + "/"
        });
      },
      ListSites: (key: string) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url: "https://api.rcrm-site-builder.com/response/" + key + "/sites/"
        });
      },
      ListProducts: (key: string, siteId: string) => {
        return Jquery.ajax({
          ...defaultOptions,
          type: "GET",
          url:
            "https://api.rcrm-site-builder.com/response/" +
            key +
            "/sites/" +
            siteId +
            "/products/"
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
          return JSON.parse(response);
        });
      }
    };
  }
}

export default new Sitebuilder({
  traditional: true,
  crossDomain: true,
  xhrFields: {
    withCredentials: true
  }
});

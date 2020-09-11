import * as JWTSimple from "jwt-simple";


export function oneLoginAs(username: string) {
  global.fetch = jest.fn().mockImplementationOnce((url: string, args: object) => {
    if (!url.match(/.*\/auth\/login/)) {
      throw `unexpected fetch URL in mock: expected /auth/login, received ${url}`;
    }

    const body = args["body"];
    const email = JSON.parse(body)["user"]["email"];
    const exp = Math.round((Date.now() + (15 * 60)) / 1000);
    const token = JWTSimple.encode({email, exp}, "key");

    if (username !== email) {
      return Promise.resolve({
	ok: false,
	status: 401
      });
    }

    return Promise.resolve({
      ok: true,
      status: 201,
      headers: new Headers({
	"Authorization": `Bearer ${token}`
      }),
      json: () => {
	return {
	  "id": 1,
	  email
	};
      }
    });
  });
}


export function oneLogout() {
  global.fetch = jest.fn().mockImplementationOnce((url: string, _args: object) => {
    if (!url.match(/.*\/auth\/logout/)) {
      throw `unexpected fetch URL in mock: expected /auth/logout, received ${url}`;
    }

    return Promise.resolve({
      ok: true,
      status: 204
    });
  });
}

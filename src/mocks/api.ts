import * as JWTSimple from "jwt-simple";


export function oneLoginAs(email: string) {
  global.fetch = jest.fn().mockImplementationOnce((url: string, args: object) => {
    if (!url.match(/.*\/auth\/login/)) {
      throw `unexpected fetch URL in mock: expected /auth/login, received ${url}`;
    }

    const body = args["body"];
    const emailArg = JSON.parse(body)["user"]["email"];
    const exp = Math.round((Date.now() + (15 * 60)) / 1000);
    const token = JWTSimple.encode({emailArg, exp}, "key");

    if (email !== emailArg) {
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
	  emailArg
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


export function oneSignup() {
  global.fetch = jest.fn().mockImplementationOnce((url: string, args: object) => {
    if (!url.match(/.*\/auth\/signup/)) {
      throw `unexpected fetch URL in mock: expected /auth/signup, received ${url}`;
    }

    return Promise.resolve({
      ok: true,
      status: 200
    });
  });
}

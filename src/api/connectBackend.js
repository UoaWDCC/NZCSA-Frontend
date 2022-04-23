import axios from "axios";

export async function updateUserInfo(setUserData) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZTJiNDQwMzM0MjBjZWExYmQ0ZGRiYyIsImlhdCI6MTYyNTU1MzMyNn0.O7wqQZ2JfGihrqt4QkTW1Kh2ZK-j5FWg1zBewYMasyU'
    },
  };
  await axios.get(`${process.env.REACT_APP_URL}/api/private/get-user-info`, config)
    .then((res) => { setUserData(res.data.data); console.log(res.data.data) })
    .catch((e) => { console.log(e); });
}



async function signUp(signUpInfo) {
  const body = signUpInfo;
  const response = await axios(
    `${process.env.REACT_APP_URL}/api/auth/register`,
    {
      headers: {
        "Content-type": "application/json",
      },
      data: body,
      method: "POST",
    }
  );
  return response;
}

async function login(loginInfo) {
  const response = await axios(
    `${process.env.REACT_APP_URL}/api/auth/login`,
    {
      headers: {
        "Content-type": "application/json",
      },
      data: loginInfo,
      method: "POST",
    }
  );
  return response;
}

async function forgetPassword(email) {
  const body = { email: email };
  const response = await axios(
    `${process.env.REACT_APP_URL}/api/auth/forgotpassword`,
    {
      headers: {
        "Content-type": "application/json",
      },
      data: body,
      method: "POST",
    }
  );
  return response;
}

async function resetPassword(pathname, password) {
  const body = { password: password };
  const response = await axios(
    `${process.env.REACT_APP_URL}/api/auth/${pathname}`,
    {
      headers: {
        "Content-type": "application/json",
      },
      data: body,
      method: "PUT",
    }
  );
  return response;
}

async function signUpEvent(registerInfo, userInfo) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/api/private/sign-up-event`,
    registerInfo,
    config
  );

  try {
    if (userInfo.googleSheetUrl != undefined || userInfo.googleSheetUrl != "") {
      console.log(userInfo)

      await axios.post(
        `${process.env.REACT_APP_URL}/api/private/save-to-google-sheet`,
        userInfo,
        config
      );
    }
  } catch (e) {
    console.log(e)
  }

  return response;
}

async function signUpMembership(userInfo) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/api/private/sign-up-membership`,
    userInfo,
    config
  );

  return response;
}

async function makePayment(paymentMethod, paymentAmount, productName) {
  const body = {
    paymentMethod,
    paymentAmount,
    productName,
  };
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/api/payment/make-payment`,
    body,
    config
  );

  return response;
}

async function createOrder(body) {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const response = await axios.post(
    `${process.env.REACT_APP_URL}/api/payment/create-order`,
    body,
    config
  );

  return response;
}

async function validateRedirect(body) {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/api/payment/make-payment`,
    body,
    config
  );

  return response;
}

async function getOneOrder(merchantReference) {
  const retries = 3;
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    timeout: 1000,
  };
  const response = await axios.get(
    `${process.env.REACT_APP_URL}/api/payment/orders/${merchantReference}`,
    config
  );

  return response;
}

async function googleAuthLogin(body) {
  const config = {
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  const response = await axios.post(
    `${process.env.REACT_APP_URL}/api/auth/googleauth`,
    body,
    config
  );

  return response;
}

export {
  signUp,
  login,
  forgetPassword,
  resetPassword,
  signUpEvent,
  makePayment,
  validateRedirect,
  createOrder,
  signUpMembership,
  getOneOrder,
  googleAuthLogin,
};

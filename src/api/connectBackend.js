import axios from "axios";

async function signUp(signUpInfo) {
  const body = signUpInfo;
  const response = await axios(
    "https://nzcsa-backend.herokuapp.com/api/auth/register",
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
    "https://nzcsa-backend.herokuapp.com/api/auth/login",
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
    "https://nzcsa-backend.herokuapp.com/api/auth/forgotpassword",
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
    `https://nzcsa-backend.herokuapp.com/api/auth/${pathname}`,
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

async function signUpEvent(registerInfo) {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
  const response = await axios.post(
    "https://nzcsa-backend.herokuapp.com/api/private/sign-up-event",
    registerInfo,
    config
  );

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
    "https://nzcsa-backend.herokuapp.com/api/private/sign-up-membership",
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
    "https://nzcsa-backend.herokuapp.com/api/payment/make-payment",
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
    "https://nzcsa-backend.herokuapp.com/api/payment/create-order",
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
    "https://nzcsa-backend.herokuapp.com/api/payment/make-payment",
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
    `https://nzcsa-backend.herokuapp.com/api/payment/orders/${merchantReference}`,
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
};

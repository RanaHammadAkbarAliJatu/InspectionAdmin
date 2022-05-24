import axios from 'axios';
import Server from './Server';

export async function SignUpform(data) {
  var config = {
    method: 'post',
    url: `${Server}/api/register`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}


export async function LoginForm(data) {
  var config = {
    method: 'post',
    url: `${Server}/api/login`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function get_all_Types_api(token) {
  var config = {
    method: 'GET',
    url: `${Server}/api/get-all-types/`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function locationUpdate(data,token) {
  var config = {
    method: 'post',
    url: `${Server}/api/send/update/request`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}
export async function CreateInspection(token, data) {
  var config = {
    method: 'post',
    url: `${Server}/api/create-inspection`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_Inspection_List(token) {
  var config = {
    method: 'GET',
    url: `${Server}/api/list-of-inspection`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization':`Bearer ${token}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function CreateLocationInspection(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/create-location`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  console.log(config,"config")

  const GetResponse = await axios(config)
    .then(function (response) {
  console.log(response,"response")

      return response;
    })
    .catch(function (error) {
  console.log(error,"error")

      return error.response;
    });
  return GetResponse;
}

export async function ListLocationInspection(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/list-of-locations`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Store_Shipment(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/store-shipment`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_All_Drivers(user_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/get-all-drivers`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}
export async function Get_All_Vehicles_Available(user_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/all-vehicles`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}
export async function Get_All_Vehicles(user_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/get-all-vehicles`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function All_Vehicles_Customer(user_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/all-vehicles`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function AddShipment(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/store-shipment`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_All_Shipments(user_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/all-shipments`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Place_Bid(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/bid-store`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}
export async function Revise(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/send-bid-revise-request`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Accept_And_RejectbyCompany(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/update-bid-revise-request`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Accept_And_RejectbyCustomer(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/bid-status-update`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_Shipments_ShipDetail(user_id, ship_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/shipment/${ship_id}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function GET_CORD_SHIP(user_id, ship_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/get/trackingpoints/${ship_id}`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Get_Shipments_byFilter(user_id) {
  var config = {
    method: 'GET',
    url: `${Server}/api/shipment/by/status`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${user_id}`,
    },
  };

  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function AssignDriver(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/assign-driver`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function Status(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/status-update`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

export async function sendLiveLoc(data, token) {
  var config = {
    method: 'post',
    url: `${Server}/api/set/cordination`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };
  const GetResponse = await axios(config)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return error.response;
    });
  return GetResponse;
}

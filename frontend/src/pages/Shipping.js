import React, { useEffect, useState } from "react";
import Metadata from "../components/Metadata";
import Stappes from "../components/Stappes";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { saveShippingInfo } from "../actions/cartActions";
import { Country, State } from "country-state-city";
import { Button } from "@mui/material";
import Loader from "../components/Loader";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setcountry] = useState(shippingInfo.countey);
  const [pinCode, setPincode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const ShippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length !== 10) {
      toast.error("Phone number should be 10 digits");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };
  return (
    <>
      {loading === true ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Metadata title="Royal Crown --Shipping" />
          <div className="container-fluid main-bg">
            <div className="container py-1">
              <div className="white-card my-2">
                <Stappes activeStep={0} />

                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 mx-auto">
                      <form
                        onSubmit={ShippingSubmit}
                        autoComplete="off"
                        encType="multipart/form-data"
                      >
                        <div className="py-5">
                          <h5 className="text-center">Shipping info</h5>
                          <input
                            type="text"
                            className="shipinput"
                            placeholder="Address"
                            value={address}
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                          />

                          <input
                            type="text"
                            className="shipinput"
                            placeholder="City"
                            value={city}
                            name="city"
                            onChange={(e) => setCity(e.target.value)}
                          />

                          <input
                            type="number"
                            className="shipinput"
                            placeholder="Number"
                            value={phoneNo}
                            name="phoneno"
                            onChange={(e) => setPhoneNo(e.target.value)}
                          />

                          <input
                            type="number"
                            className="shipinput"
                            placeholder="Pincode"
                            value={pinCode}
                            name="pincode"
                            onChange={(e) => setPincode(e.target.value)}
                          />

                          <select
                            className="shipinput"
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}
                          >
                            <option>Country</option>
                            {Country &&
                              Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                  {item.name}
                                </option>
                              ))}
                          </select>

                          {country && (
                            <select
                              className="shipinput "
                              value={state}
                              onChange={(e) => setState(e.target.value)}
                            >
                              <option>State</option>
                              {State &&
                                State.getStatesOfCountry(country).map(
                                  (item) => (
                                    <option
                                      key={item.isoCode}
                                      value={item.isoCode}
                                    >
                                      {item.name}
                                    </option>
                                  )
                                )}
                            </select>
                          )}

                          <Button
                            type="submit"
                            variant="contained"
                            className="w-100 gold font-2"
                          >
                            Submit
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Shipping;

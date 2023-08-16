import React, { useState, useEffect } from "react";
import config from "../../../config/config";
import featureList from "../../../config/features";

const FeatureGetter = () => {
  const [feature, setFeatures] = useState("");

  function getJsonData() {
    return fetch(
      "https://app12.s3.ap-east-1.amazonaws.com/features_" +
        config.brand +
        ".json"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setFeatures(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  var defaultFeature = featureList["default"];
  var brandFeature = feature || featureList["default"];
  for (var k in brandFeature) {
    defaultFeature[k] = brandFeature[k];
  }
  config.features = defaultFeature;

  useEffect(() => {
    if (feature === "") {
      getJsonData();
    } else {
    }
  }, []);

  return <div />;
};

export default FeatureGetter;

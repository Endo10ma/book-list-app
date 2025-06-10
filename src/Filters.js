import React from "react";

function Filters({ filters, setFilters }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <select name="country" onChange={handleChange} value={filters.country}>
        <option value="">All Countries</option>
        <option value="United States">United States</option>
        <option value="Russia">Russia</option>
        <option value="England">England</option>
        <option value="France">France</option>
        <option value="Germany">Germany</option>
      </select>

      <select name="language" onChange={handleChange} value={filters.language} style={{ marginLeft: "10px" }}>
        <option value="">All Languages</option>
        <option value="English">English</option>
        <option value="Russian">Russian</option>
        <option value="French">French</option>
        <option value="German">German</option>
        <option value="Spanish">Spanish</option>
      </select>

      <select name="pages" onChange={handleChange} value={filters.pages} style={{ marginLeft: "10px" }}>
        <option value="">All Pages</option>
        <option value="0-100">1–100</option>
        <option value="101-200">101–200</option>
        <option value="201-300">201–300</option>
        <option value="301+">> 300</option>
      </select>

      <select name="century" onChange={handleChange} value={filters.century} style={{ marginLeft: "10px" }}>
        <option value="">All Centuries</option>
        <option value="16">16th</option>
        <option value="17">17th</option>
        <option value="18">18th</option>
        <option value="19">19th</option>
        <option value="20">20th</option>
      </select>
    </div>
  );
}

export default Filters;

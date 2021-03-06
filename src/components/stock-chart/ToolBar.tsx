import React, { Dispatch, SetStateAction, useState } from "react";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

import ChartIcon from "assets/svg/candlestick-chart.svg";
import ResetIcon from "assets/svg/reset.svg";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface HeaderProps {
  state: {
    onReset: () => void;
    dateSetting: number;
    setDateSetting: Dispatch<SetStateAction<number>>;
    chartSetting: string;
    setChartSetting: Dispatch<SetStateAction<string>>;
  };
}

const ToolBar = ({ state }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const {
    onReset,
    dateSetting,
    setDateSetting,
    chartSetting,
    setChartSetting,
  } = state;

  const handleChartSettingChange = (chart: string) => {
    setChartSetting(chart);
    handleClose1();
  };

  const handleDateSettingChange = (e) => {
    setDateSetting(Number(e.target.value));
  };

  const handleResetClick = () => {
    dateSetting !== 0 && setDateSetting(0);
    chartSetting !== "candle" && setChartSetting("candle");
    onReset();
  };

  const [isShow, setIsShow] = useState<boolean>(false);

  const handleDropdown = () => {
    setIsShow(() => !isShow);
  };

  return (
    <div className="toolbar">
      <div className="box text title">
        <Button
          className="tool__box title"
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open2 ? "true" : undefined}
          onClick={handleClick2}
        >
          <span className="">?????? , ??????</span>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl2}
          open={open2}
          onClose={handleClose2}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => alert("??????????????????")}>?????????</MenuItem>
          <MenuItem onClick={() => alert("??????????????????")}>????????? ??????</MenuItem>
          <MenuItem onClick={() => alert("??????????????????")}>
            ??????????????????
          </MenuItem>
        </Menu>
      </div>
      <div className="box">
        <Button
          className="tool__box"
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <span className="toolbar__icon text">1D</span>
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => alert("??????????????????")}>1???</MenuItem>
          <MenuItem onClick={() => alert("??????????????????")}>1???</MenuItem>
          <MenuItem onClick={() => alert("??????????????????")}>??? ???</MenuItem>
        </Menu>
      </div>
      <div className="box">
        <Button
          className="tool__box"
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open1 ? "true" : undefined}
          onClick={handleClick1}
        >
          <ChartIcon className="toolbar__icon" />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl1}
          open={open1}
          onClose={handleClose1}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={() => handleChartSettingChange("candle")}>
            ??????
          </MenuItem>
          <MenuItem onClick={() => handleChartSettingChange("line")}>
            ???
          </MenuItem>
          <MenuItem onClick={() => handleChartSettingChange("area")}>
            ??????
          </MenuItem>
        </Menu>
      </div>
      <div className="box">
        <Button
          className="tool__box"
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleResetClick}
        >
          <ResetIcon className="toolbar__icon" />
        </Button>
      </div>
      {/* <select
        name="date"
        id="date"
        value={dateSetting}
        onChange={handleDateSettingChange}
      >
        <option value="0">1???</option>
        <option value="1">1??????</option>
        <option value="2">3??????</option>
        <option value="3">6??????</option>
        <option value="4">1???</option>
      </select> */}

      {/* <select
        name="theme"
        id="theme"
        // value={themeSetting}
        // onChange={handleThemeSettingChange}
      >
        <option value="0">Theme 1</option>
        <option value="1">Theme 2</option>
      </select>

      <select
        name="setting"
        id="setting"
        value={chartSetting}
        onChange={handleChartSettingChange}
      >
        <option value="candle">??????</option>
        <option value="line">???</option>
        <option value="area">??????</option>
      </select>
      <button type="button" onClick={handleResetClick}>
        ?????????
      </button> */}
    </div>
  );
};

export default ToolBar;

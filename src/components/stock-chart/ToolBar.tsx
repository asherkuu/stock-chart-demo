import React, { Dispatch, SetStateAction, useState } from "react";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

import CandleChart from "assets/svg/candlestick-chart.svg";

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    handleClose();
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
      <div className="box">
        <Button
          className="tool__box"
          id="basic-button"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <CandleChart className="toolbar__icon" />
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
          <MenuItem onClick={() => handleChartSettingChange("candle")}>
            캔들
          </MenuItem>
          <MenuItem onClick={() => handleChartSettingChange("line")}>
            선
          </MenuItem>
          <MenuItem onClick={() => handleChartSettingChange("area")}>
            영역
          </MenuItem>
        </Menu>
      </div>
      {/* <select
        name="date"
        id="date"
        value={dateSetting}
        onChange={handleDateSettingChange}
      >
        <option value="0">1일</option>
        <option value="1">1개월</option>
        <option value="2">3개월</option>
        <option value="3">6개월</option>
        <option value="4">1년</option>
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
        <option value="candle">캔들</option>
        <option value="line">선</option>
        <option value="area">영역</option>
      </select>
      <button type="button" onClick={handleResetClick}>
        초기화
      </button> */}
    </div>
  );
};

export default ToolBar;

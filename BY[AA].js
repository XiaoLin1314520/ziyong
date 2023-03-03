var timer = false;
var down = false;
var man_timer = false;
lll = false;
a = 0;
var czz = 0;
var slide = false;
var fakeoff = 1;
var slideFactor = 0;
man_init = false;
yawFactor = 0;
rgb_r = 0;
rgb_g = 100;
rgb_b = 255;
current_preset = 0;
var sw_timer = false;
var sw_cur = 1;
exploit_on = false;
var lastTime = 0;
UI.AddSubTab(["Rage", "SUBTAB_MGR"], "Anti-Aim.js");

UI.AddDropdown(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Presets", ["Custom", "Exploit AA", "Spike\"s", "Blank"],0);
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Advanced Jitter");
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Range", -180, 180);
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Offset Break");
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Anti-Bruteforce (Do not use right now)");
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Sway");
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Sway Limit");
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Limit Amount", 0, 60);
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Sway Range", 0, 360);
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Sway Speed", 1, 50);
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Fake Jitter");
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Fake Jitter Speed", 1, 100);
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Fake Jitter Range", 1, 100);
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Fake Jitter Step", 1, 10);
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Switch AA");
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Switch Delay", 1, 1000);
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Switch Yaw #1", -180, 180);
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Switch Yaw #2", -180, 180);
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Switch Yaw #3", -180, 180);
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Custom Manual AA");
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Sensitivity", 1, 10);
UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"],"Custom Manual Left","Custom Manual Left");
UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"],"Custom Manual Right","Custom Manual Right");
UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"],"Reset Yaw","Reset Yaw");
UI.AddSliderInt(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Reset Yaw Value", -180, 180);
UI.AddDropdown(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Watermark Position", ["Bottom Left Corner", "Bottom Right Corner", "Top Left Corner", "Top Right Corner"],0);
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"RBG Fade Watermark");
UI.AddCheckbox(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Seizure Watermark");
UI.SetEnabled(["Config", "Configuration", "Import from clipboard"], 0)    
function antiaimloop() {
    
    var $typeface = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Advanced Jitter"]);
    var $off = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Offset Break"]);
    var $opm = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Anti-Bruteforce (Do not use right now)"]);
    var $sway = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Sway"]);
    var $switch = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Switch AA"]);
    var $fake = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter"]);
    if (UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Presets"]) !== current_preset){
        loadPreset(UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Presets"]));
        current_preset = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Presets"]);
    }
    if (!$typeface) {
        UI.SetValue(["Rage", "Anti Aim", "Directions", "Jitter offset"], 0);
    }
    if ($typeface) {
        var $range = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Range"]);
        var bg = $range;
        var sg = ($range *  -1);
        min = Math.ceil(sg);
        max = Math.floor(bg);
        AntiAim.SetOverride(1);
        var subVal = (Math.floor(Math.random(subVal) * (max - min)) + min);
        var rem = subVal / 2;
        UI.SetValue(["Rage", "Anti Aim", "Directions", "Yaw offset"], rem);
        UI.SetValue(["Rage", "Anti Aim", "Directions", "Jitter offset"], subVal);
    }
    if ($off) {
        var m2 = m2 + m1;
        var m1 = Math.floor(Math.random() * 100) - 50;
        var c1 = Math.floor( (Math.random() * 50)) - 25;
        var offsetVal = (m1 * -1);
        AntiAim.SetOverride(1);
        AntiAim.SetFakeOffset(m1);
        AntiAim.SetRealOffset(offsetVal);
    }
    {
        isInverted = UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", 'AA direction inverter']);
        slideRange = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Sway Range"]);
        slideRate = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Sway Speed"]);
        limit = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Sway Limit"]);
        LimitFactor = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Limit Amount"]);
        if (!limit) {
            if (slide) {
                if (slideFactor > (slideRange / 2)) {
                    slide = false;
                } else {
                    slideFactor += slideRate;
                }
            } else {
                if (slideFactor < -(slideRange / 2)) {
                    slide = true;
                } else {
                    slideFactor -= slideRate;
                }
            }
            slideRange += slideFactor;
        } else if (limit) {
            if (slide) {
                if (slideFactor > slideRange / 2) {
                    slide = false;
                } else {
                    slideFactor += slideRate;
                }
            } else {
                if (slideFactor < LimitFactor / 2) {
                    slide = true;
                } else {
                    slideFactor -= slideRate;
                }
            }
        }
        if ($sway && !isInverted) {
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(slideFactor);
            AntiAim.SetLBYOffset(-slideFactor);
        } else if ($sway && isInverted) {
            AntiAim.SetOverride(1);
            AntiAim.SetFakeOffset(0);
            AntiAim.SetRealOffset(-slideFactor);
            AntiAim.SetLBYOffset(slideFactor);
        }
    }
    if ($fake) {
        FJ_Step = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Fake Jitter Step"]);
        FJ_Range = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Fake Jitter Range"]);
        FJ_Speed = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Fake Jitter Speed"]);
        FJ_Extend = ((1e-9)/ (FJ_Speed * 0x4ee0d1d72fd4780000000000000));
        FJ_Retract = 1e-22 / (FJ_Speed * 0x7e3482f1e620c0000000000000);
        AntiAim.SetOverride(1);
        if ((a < FJ_Range) && !down) {
            if (!timer) {
                lasttime = Globals.Curtime();
                timer = true;
            }
            if (Globals.Curtime() >=( lasttime + FJ_Extend)) {
                a += FJ_Step;
                if (!areExploits()) {
                    AntiAim.SetFakeOffset(0);
                    if (!isInverted) {
                        AntiAim.SetLBYOffset(a);
                    } else if (isInverted) {
                        AntiAim.SetLBYOffset(-a);
                    }
                } else {
                    if (!isInverted) {
                        AntiAim.SetFakeOffset(a);
                        AntiAim.SetFakeOffset(-a);
                    } else if (isInverted) {
                        AntiAim.SetFakeOffset(-a);
                        AntiAim.SetFakeOffset(a);
                    }
                }
                timer = false;
            }
        } else if ( (a >= FJ_Range) || down) {
            down = true;
            if (a <= 0) {
                down = false;
            }
            if (!timer) {
                lasttime = Globals.Curtime();
                timer = true;
            }
            if (Globals.Curtime() >= (lasttime + FJ_Retract)) {
                a -= FJ_Step;
                if (!areExploits()) {
                    AntiAim.SetFakeOffset(0);
                    if (!isInverted) {
                        AntiAim.SetLBYOffset(a);
                    } else if (isInverted) {
                        AntiAim.SetLBYOffset(-a);
                    }
                } else {
                    if (!isInverted) {
                        AntiAim.SetFakeOffset(a);
                        AntiAim.SetFakeOffset(-a);
                    } else if (isInverted) {
                        AntiAim.SetFakeOffset(-a);
                        AntiAim.SetFakeOffset(a);
                    }
                }
                timer = false;
            }
        }
    }
    if ($switch) {
        switchC1 = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Switch Yaw #1"]);
        switchC2 = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Switch Yaw #2"]);
        switchC3 = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Switch Yaw #3"]);
        switchDelay = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js",  "Switch Delay"]);
        sw_delay = 0.001 * switchDelay;
        if (!sw_timer) {
            sw_lasttime = Globals.Curtime();
            sw_timer = true;
        }
        if (Globals.Curtime() >= sw_lasttime + sw_delay) {
            if (sw_cur == 1) {
                sw_val = switchC2;
                sw_cur += 1;
                sw_timer = false;
            } else if (sw_cur == 2) {
                sw_val = switchC3;
                sw_cur += 1;
                sw_timer = false;
            } else if (sw_cur == 3) {
                sw_val = switchC1;
                sw_cur = 1;
                sw_timer = false;
            }
            if (!isInverted) {
                UI.SetValue(["Rage", "Anti Aim", "Directions", "Yaw offset"], sw_val);
            } else if (isInverted) {    
                UI.SetValue(["Rage", "Anti Aim", "Directions", "Yaw offset"], -sw_val);
            }
        }
    }
    enabled7 = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Custom Manual AA");
    manualRight = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Custom Manual Right");
    manualLeft = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Custom Manual Left");
    man_sens = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Sensitivity");
    isYawReset = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Reset Yaw");
    resetYawVal = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"],"Reset Yaw Value");
    if (enabled7) {
        if (isYawReset) {
            setYaw( resetYawVal);
            yawFactor = 0;
        }
        if (manualRight || manualLeft) {
            if (man_init === false) {
                man_init = true;
            }
            if (!man_timer) {
                man_last = Globals.Curtime();
                man_timer = true;
            }
            if ((man_last + 0.003) >= Globals.Curtime()) {
                if (manualRight) {
                    if (yawFactor <= 90) {
                        yawFactor += man_sens;
                    }
                } else if (manualLeft) {
                    if (yawFactor >= -90) {
                        yawFactor -= man_sens;
                    }
                }
                man_timer = false;
            }
            if (yawFactor < 90 && yawFactor > -90) {
                setYaw(yawFactor);
            }
        } else if (man_init) {
            man_init = false;
        }
    }




}

function onFire() {
    return;
}

function user() {
	var screen_size = Render.GetScreenSize();
    switch (UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Watermark Position"])) {
        case 0:
            wm_xOffset = 0;
            wm_yOffset = -100;
            break;
        case 1:
            wm_xOffset = 1450;
            wm_yOffset = -50;
            break;
        case 2:
            wm_xOffset = 20;
            wm_yOffset = -1050;
            break;
        case 3:
            wm_xOffset = 1700;
            wm_yOffset = -1050;
            break;
        default:
            wm_xOffset = 20;
            wm_yOffset = -100;
            break;
    }
    var font = Render.GetFont( "Tahomabd.ttf", 20, true);
    if (!UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Seizure Watermark"]) && !UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "RBG Fade Watermark"])) {
        Render.String( ( Global.GetScreenSize()[0] / 20) + wm_xOffset, Global.GetScreenSize()[1] + wm_yOffset, 1, "CFG BY BeiYing", [0, 255, 255, 255], font);
    } else if (!UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "Seizure Watermark"]) && UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js", "RBG Fade Watermark"])) {
        if ((rgb_r > 0) && (rgb_b == 0)) {
            rgb_r--;
            rgb_g++;
        }
        if ((rgb_g > 0) && rgb_r == 0) {
            rgb_g--;
            rgb_b++;
        }
        if (rgb_b > 0 && rgb_g == 0) {
            rgb_r++;
            rgb_b--;
        }
        Render.String(Global.GetScreenSize()[0] / 20 + wm_xOffset, Global.GetScreenSize()[1] + wm_yOffset, 1, "CFG BY BeiYing", [rgb_r, rgb_g, rgb_b, 255], font);
    } else {
        Render.String( (Global.GetScreenSize()[0] / 20 + wm_xOffset),  (Global.GetScreenSize()[1] + wm_yOffset), 1, "CFG BY BeiYing", [rand_int( 0, 255), rand_int(0, 255), rand_int(0, 255), 255], font);
    }
    return true;
}

function setYaw(yaw) {
    UI.SetValue(["Rage", "Anti Aim", "Directions", "Yaw offset"], yaw);
}

function rand_int(min, max) {
    return Math.floor(Math.random() * ( (max -  min) + 1) + min);
}

function onUnload() {
    AntiAim.SetOverride(0);
}

function getScriptVal(name) {
    return UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"], name);
}

function setScriptVal(key, value) {
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js"], key, value);
}

function areExploits() {

    if (UI.GetValue(["Rage", "Exploits", "Keys", "Double tap"]) || UI.GetValue(["Rage", "Exploits", "Keys", "Hide shots"])) {
        if (!exploit_on) {
            OG_FJspeed = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Speed"]);
            OG_FJrange = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Range"]);
            OG_FJstep = UI.GetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Step"]);
        }
        UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Speed"], 90);
        UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Range"], 11);
        UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Step"], 8);
        exploit_on = true;
        return true;
    } else {
        if (exploit_on) {
            UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Speed"], OG_FJspeed);
            UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Range"], OG_FJrange);
            UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Step"], OG_FJstep);
        }
        exploit_on = false;
        return false;
    }
}

function loadPreset(parms) {
    switch (parms) {
        case 0:
            return;
            break;
        case 1:
            p_isAdvancedJitter = 0;
            p_AdvancedRange = 0;
            p_isOffsetBreak = 0;
            p_isSway = 1;
            p_isSwayLimit = 0;
            p_LimitRange = 0;
            p_swayRange = 47;
            p_swaySpeed = 15;
            p_isFakeJitter = 0;
            p_FJspeed = 90;
            p_FJrange = 90;
            p_FJstep = 3;
            p_isSwitchAA = 1;
            p_yawVal1 = 8;
            p_yawVal2 = -10;
            p_yawVal3 = 2;
            break;
        case 2:
            p_isAdvancedJitter = 1;
            p_AdvancedRange = -8;
            p_isOffsetBreak = 0;
            p_isSway = 1;
            p_isSwayLimit = 1;
            p_LimitRange = 8;
            p_swayRange = 123;
            p_swaySpeed = 5;
            p_isFakeJitter = 0;
            p_FJspeed = 90;
            p_FJrange = 90;
            p_FJstep = 3;
            p_isSwitchAA = 1;
            p_yawVal1 = 8;
            p_yawVal2 = -10;
            p_yawVal3 = 2;
            break;
        case 3:
            p_isAdvancedJitter = 0;
            p_AdvancedRange = 0;
            p_isOffsetBreak = 0;
            p_isSway = 0;
            p_isSwayLimit = 0;
            p_LimitRange = 0;
            p_swayRange = 0;
            p_swaySpeed = 0;
            p_isFakeJitter = 0;
            p_FJspeed = 0;
            p_FJrange = 0;
            p_FJstep = 0;
            p_isSwitchAA = 0;
            p_yawVal1 = 0;
            p_yawVal2 = -10;
            p_yawVal3 = 0;
            break;
        default:
            return;
            break;
    }
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Advanced Jitter"], p_isAdvancedJitter);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Range"], p_AdvancedRange);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Sway"], p_isSway);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Offset Break"], p_isOffsetBreak);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Sway Limit"], p_isSwayLimit);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Limit Amount"], p_LimitRange);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Sway Range"], p_swayRange);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Sway Speed"], p_swaySpeed);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter"], p_isFakeJitter);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Speed"], p_FJspeed);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Range"], p_FJrange);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Sway Limit"], p_isSwayLimit);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Fake Jitter Step"], p_FJstep);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Switch AA"], p_isSwitchAA);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Switch Yaw #1"], p_yawVal1);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Switch Yaw #2"], p_yawVal2);
    UI.SetValue(["Rage", "Anti-Aim.js", "Anti-Aim.js","Switch Yaw #3"], p_yawVal3);
}

Cheat.RegisterCallback("CreateMove", "antiaimloop");
Cheat.RegisterCallback("Draw", "user");
Cheat.RegisterCallback("Unload", "onUnload");

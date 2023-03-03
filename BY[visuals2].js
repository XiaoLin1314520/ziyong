UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "CC & Fog");
UI.AddCheckbox(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog"], "Enable color correction");
UI.AddSliderInt(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog"], "Tint", 0, 100);
UI.AddSliderInt(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog"], "Intensity", 0, 100);

UI.AddCheckbox(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog"], "Enable fog correction");
UI.AddColorPicker(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog"], "Color");
UI.AddSliderInt(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog"], "Distance", 0, 2500);
UI.AddSliderInt(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog"], "Density", 0, 100);

function update_fog()
{
    if (!UI.GetValue(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog", "Enable fog correction"]))
    {
        if (Convar.GetString("fog_override") !== "0")
        {
            Convar.SetString("fog_override", "0");
        }

        return;
    }

    if (Convar.GetString("fog_override") !== "1")
    {
        Convar.SetString("fog_override", "1");
    }

    var clr = UI.GetColor(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog", "Color"]);
    var clr_value = clr[0] + " " + clr[1] + " " + clr[2];

    var dist = UI.GetString(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog", "Distance"]);
    var dens = (UI.GetValue(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog", "Density"]) / 100).toString();

    if (Convar.GetString("fog_color") !== clr_value)
        Convar.SetString("fog_color", clr_value);

    if (Convar.GetString("fog_end") !== dist)
    {
        Convar.SetString("fog_start", "0");
        Convar.SetString("fog_end", dist);
    }


    if (Convar.GetString("fog_maxdensity") !== dens)
        Convar.SetString("fog_maxdensity", dens);
}

function draw_cc()
{
    if (!UI.GetValue(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog", "Enable color correction"]))
        return;

    var tint = UI.GetValue(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog", "Tint"]);
    var intensity = UI.GetValue(["Visuals", "SUBTAB_MGR", "CC & Fog", "SHEET_MGR", "CC & Fog", "Intensity"]);

    var x = Render.GetScreenSize()[0], y = Render.GetScreenSize()[1];

    Render.FilledRect(
        0,
        0,
        x,
        y,
        [tint,
         0,
         255 - tint,
         intensity
        ]
    );
}

Convar.SetString("r_3dsky", "0");

function main()
{
    update_fog();
    draw_cc();
}

Cheat.RegisterCallback("Draw", "main");

// https://www.onetap.com/threads/bloom-world.31353/#post-264795
var props = false;
var tonemapClass = 'CEnvTonemapController';

 function onRender() {
  if (!Entity.GetLocalPlayer()) {
    return;
  }

var worldColor = (
    UI.GetValue(['Visuals', "Bloom", "Bloom",'enable world color modulation'])
      ? UI.GetColor(['Visuals', "Bloom", "Bloom",'world color'])
      : [0, 0, 0]
);

  Convar.SetFloat('mat_ambient_light_r', worldColor[0] / 100);
  Convar.SetFloat('mat_ambient_light_g', worldColor[1] / 100);
  Convar.SetFloat('mat_ambient_light_b', worldColor[2] / 100);

  var entities = Entity.GetEntities();

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    var name = Entity.GetClassName(entity);

    if (name !== tonemapClass) {
      continue;
    }

    if (!props) {
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMin', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomAutoExposureMax', true);
      Entity.SetProp(entity, tonemapClass, 'm_bUseCustomBloomScale', true);

      props = true;
    }

    if (props) {
      var value = UI.GetValue(['Visuals', "Bloom", "Bloom",'world exposure']) / 10;
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMin', value);
      Entity.SetProp(entity, tonemapClass, 'm_flCustomAutoExposureMax', value);

      Entity.SetProp(entity, tonemapClass, 'm_flCustomBloomScale', UI.GetValue(['Visuals', "Bloom", "Bloom",'bloom scale']) / 10);
    }

    Convar.SetFloat('r_modelAmbientMin', UI.GetValue(['Visuals', "Bloom", "Bloom",'model ambient']) / 10);
  }
}

function init() {
  UI.AddSubTab(['Visuals', "SUBTAB_MGR"], "Bloom") 
  UI.AddCheckbox(['Visuals', "Bloom", "Bloom"],'enable world color modulation');
  UI.AddColorPicker(['Visuals', "Bloom", "Bloom"],'world color');
  UI.AddSliderFloat(['Visuals', "Bloom", "Bloom"],'world exposure', 0.0, 100.0);
  UI.AddSliderFloat(['Visuals', "Bloom", "Bloom"],'model ambient', 0.0, 100.0);
  UI.AddSliderFloat(['Visuals', "Bloom", "Bloom"],'bloom scale', 0.0, 100.0);

  UI.SetValue(['Misc.', 'Helpers', 'Client', 'Reveal hidden cvars'], 1);
  UI.SetValue(['Visuals', 'Extra','Removals', 'Disable post processing'], 0);

  Global.RegisterCallback("Draw", "onRender");
}

init();

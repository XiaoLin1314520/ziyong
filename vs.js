const Path = {
   mainPath: ["Config", "SUBTAB_MGR"],
   stylePath: ["Config", "Fashion UI", "Fashion UI"],
   imagePath: "ot/scripts/Hamster/img/",
}

const Visual = {
   width: 0,
   height: 0,
   variable: {
      field: "Fashion UI",
      backgroundName: "Background Menu",
      backgroundStatus: 0,
   },
   init() {
      UI.AddSubTab(Path.mainPath, Visual.variable.field);

      Visual.width = Render.GetScreenSize()[0];
      Visual.height = Render.GetScreenSize()[1];

      // background
      UI.AddCheckbox(Path.stylePath, this.variable.backgroundName);
   },
   backgroundMain() {
      if (UI.GetValue(Path.stylePath.concat(Visual.variable.backgroundName)) && Entity.IsAlive(Entity.GetLocalPlayer())) {
         var background = Texture.getTexture("hamster.png");
         Render.TexturedRect(0, 0, Visual.width, Visual.height, background);
      }
   },
}

const Texture = {
   texture: {
   },
   getTexture(path) {
      path = Path.imagePath + path;

      if (!this.texture.hasOwnProperty(path)) {
         this.texture[path] = Render.AddTexture(path);

         return this.texture[path];
      }

      return this.texture[path];
   }
}

Visual.init();

Cheat.RegisterCallback("Draw", "Visual.backgroundMain");

Hooks.once('init', () => {
	game.settings.register("dnd5e_cs-CZ", "show-original-name", {
		name: "CZ items",
		hint: "",
		scope: "world",
		config: true,
		default: true,
		type: Boolean,
		onChange: _ => window.location.reload()
	});

	if (typeof Babele !== 'undefined') {
		Babele.get().register({
			module: 'dnd5e_cs-CZ',
			lang: 'cs',
			dir: 'compendium'
		});

		if (!game.settings.get("dnd5e_cs-CZ", "show-original-name")) return;
		TranslatedCompendium.prototype.translateOrigin = TranslatedCompendium.prototype.translate;
		TranslatedCompendium.prototype.translate = function(data) {
			let originalName = data.name;
			let translatedData = this.translateOrigin(data);
			if (originalName !== translatedData.name){
				translatedData.name = translatedData.name;
			}
			return translatedData;
		};
		TranslatedCompendium.prototype.i18nNameOrigin = TranslatedCompendium.prototype.i18nName;
		TranslatedCompendium.prototype.i18nName = function(idx) {
			let translated = this.i18nNameOrigin(idx);
			return translated === idx.name ? translated : translated + ' ' + idx.name;
		};
	}
});

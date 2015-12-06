/* jslint node: true */
'use strict';

//
//	Gematria
//

var G =
{
	"forward": [["ᚠ", "F"], ["ᚢ", "U/V"], ["ᚦ", "TH"], ["ᚩ", "O"], ["ᚱ", "R"], ["ᚳ", "C/K"], ["ᚷ", "G"], ["ᚹ", "W"], ["ᚻ", "H"], ["ᚾ", "N"], ["ᛁ", "I"], ["ᛄ", "J"], ["ᛇ", "EO"], ["ᛈ", "P"], ["ᛉ", "X"], ["ᛋ", "S/Z"], ["ᛏ", "T"], ["ᛒ", "B"], ["ᛖ", "E"], ["ᛗ", "M"], ["ᛚ", "L"], ["ᛝ", "NG/ING"], ["ᛟ", "OE"], ["ᛞ", "D"], ["ᚪ", "A"], ["ᚫ", "AE"], ["ᚣ", "Y"], ["ᛡ", "IA/IO"], ["ᛠ", "EA"]],

	"reversed": [['ᚠ', 'EA'], ['ᚢ', 'IA/IO'], ['ᚦ', 'Y'], ['ᚩ', 'AE'], ['ᚱ', 'A'], ['ᚳ', 'D'], ['ᚷ', 'OE'], ['ᚹ', 'NG/ING'], ['ᚻ', 'L'], ['ᚾ', 'M'], ['ᛁ', 'E'], ['ᛄ', 'B'], ['ᛇ', 'T'], ['ᛈ', 'S/Z'], ['ᛉ', 'X'], ['ᛋ', 'P'], ['ᛏ', 'EO'], ['ᛒ', 'J'], ['ᛖ', 'I'], ['ᛗ', 'N'], ['ᛚ', 'H'], ['ᛝ', 'W'], ['ᛟ', 'G'], ['ᛞ', 'C/K'], ['ᚪ', 'R'], ['ᚫ', 'O'], ['ᚣ', 'TH'], ['ᛡ', 'U/V'], ['ᛠ', 'F']],

	"table" : [],

	"reverse": function() {this.table = this.reversed;},

	"reset": function()	{this.table = this.forward;},

	"shift": function(letter, offset)
	{
		var max = this.table.length;

		// Loop through Gematria.
		for (var i = 0; i < max; i ++)
		{
			// If letter is found in Gematria return the latin char at offset.
			if (this.table[i][0].indexOf(letter) === 0)
			{
				// Add index to offset to get the absolut offset.
				offset = offset + i;

				// If offset > table warp around.
				if (offset >= max) offset = offset % max;

				// If offset < 0 warp around.
				else if (offset < 0) {offset = max + (offset % max); if (offset === max) offset = 0;}

				else offset = offset % max;
			}
		}

		return this.table[offset][1];
	}
};

module.exports = G;
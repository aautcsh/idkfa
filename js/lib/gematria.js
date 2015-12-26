/* jslint node: true */
'use strict';

//
//	Gematria
//

var G =
{
	"forward": [["ᚠ", "F"], ["ᚢ", "UV"], ["ᚦ", "TH"], ["ᚩ", "O"], ["ᚱ", "R"], ["ᚳ", "CK"], ["ᚷ", "G"], ["ᚹ", "W"], ["ᚻ", "H"], ["ᚾ", "N"], ["ᛁ", "I"], ["ᛄ", "J"], ["ᛇ", "EO"], ["ᛈ", "P"], ["ᛉ", "X"], ["ᛋ", "SZ"], ["ᛏ", "T"], ["ᛒ", "B"], ["ᛖ", "E"], ["ᛗ", "M"], ["ᛚ", "L"], ["ᛝ", "NGING"], ["ᛟ", "OE"], ["ᛞ", "D"], ["ᚪ", "A"], ["ᚫ", "AE"], ["ᚣ", "Y"], ["ᛡ", "IAIO"], ["ᛠ", "EA"]],

	"reversed": [['ᚠ', 'EA'], ['ᚢ', 'IAIO'], ['ᚦ', 'Y'], ['ᚩ', 'AE'], ['ᚱ', 'A'], ['ᚳ', 'D'], ['ᚷ', 'OE'], ['ᚹ', 'NGING'], ['ᚻ', 'L'], ['ᚾ', 'M'], ['ᛁ', 'E'], ['ᛄ', 'B'], ['ᛇ', 'T'], ['ᛈ', 'SZ'], ['ᛉ', 'X'], ['ᛋ', 'P'], ['ᛏ', 'EO'], ['ᛒ', 'J'], ['ᛖ', 'I'], ['ᛗ', 'N'], ['ᛚ', 'H'], ['ᛝ', 'W'], ['ᛟ', 'G'], ['ᛞ', 'CK'], ['ᚪ', 'R'], ['ᚫ', 'O'], ['ᚣ', 'TH'], ['ᛡ', 'UV'], ['ᛠ', 'F']],

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
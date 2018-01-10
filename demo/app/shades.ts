export function shadeBlendConvert(color: string, amount: number): string {
  if (amount < 0) {
    return darken(color, Math.abs(amount));
  } else {
    return lighten(color, amount);
  }
}

/* Suma el porcentaje indicado a un color (RR, GG o BB) hexadecimal para aclararlo */
const addLight = function(color, amount){
  let cc = parseInt(color,16) + amount;
  let c = (cc > 255) ? 255 : (cc);
  return (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
}

/* Aclara un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
const lighten = (color, amount)=> {
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return color = `#${addLight(color.substring(0,2), amount)}${addLight(color.substring(2,4), amount)}${addLight(color.substring(4,6), amount)}`;
}

/* Resta el porcentaje indicado a un color (RR, GG o BB) hexadecimal para oscurecerlo */
function subtractLight(color, amount) {
  let cc = parseInt(color,16) - amount;
  let c = (cc < 0) ? 0 : (cc);
  return (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
}

/* Oscurece un color hexadecimal de 6 caracteres #RRGGBB segun el porcentaje indicado */
function darken(color, amount) {
  color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
  amount = Math.trunc((255 * amount) / 100);
  return color = `#${subtractLight(color.substring(0,2), amount)}${subtractLight(color.substring(2,4), amount)}${subtractLight(color.substring(4,6), amount)}`;
}

/**
 * Calculates luminance of an rgb color
 * @param r red
 * @param g green
 * @param b blue
 */
function luminanace(r, g, b) {
  var a = [r, g, b].map(function (v) {
      v /= 255;
      return v <= 0.03928
          ? v / 12.92
          : Math.pow( (v + 0.055) / 1.055, 2.4 );
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculates contrast between two rgb colors
 * @param rgb1 rgb color 1
 * @param rgb2 rgb color 2
 */
function contrast(rgb1, rgb2) {
  return (luminanace(rgb1[0], rgb1[1], rgb1[2]) + 0.05)
  / (luminanace(rgb2[0], rgb2[1], rgb2[2]) + 0.05);
}

/**
 * Determines what the best text color is based con the contrast with the background
 * @param hexColor - Last selected color by the user
 */
export function calculateBestTextColor(hexColor: string) : string {
  const rgbColor = hexToRGB(hexColor.substring(1));
  const contrastWithBlack = contrast(rgbColor.split(','), [0, 0, 0]);

  return contrastWithBlack >= 12 ? '#000000' : '#FFFFFF';
}

function hexToRGB(hex: string): string {
  return parseInt(hex.substring(0, 2), 16) + ',' + parseInt(hex.substring(2, 4), 16) + ',' + parseInt(hex.substring(4, 6), 16);
}

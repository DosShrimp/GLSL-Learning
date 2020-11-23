//HSV_to_RGB
function hsv2rgb(H, S, V) {

  var C = V * S;
  var Hp = H / 60;
  var X = C * (1 - Math.abs(Hp % 2 - 1));

  var R, G, B;

  if(0 <= Hp && Hp < 1) {[R,G,B]=[C,X,0]};
  if(1 <= Hp && Hp < 2) {[R,G,B]=[X,C,0]};
  if(2 <= Hp && Hp < 3) {[R,G,B]=[0,C,X]};
  if(3 <= Hp && Hp < 4) {[R,G,B]=[0,X,C]};
  if(4 <= Hp && Hp < 5) {[R,G,B]=[X,0,C]};
  if(5 <= Hp && Hp < 6) {[R,G,B]=[C,0,X]};

  var m = V - C;

  [R, G, B] = [R+m, G+m, B+m];

  return [R, G, B];

}

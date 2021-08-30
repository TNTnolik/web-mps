//let OsnR, e, e1, d1, d, OsnRr, Plat_r, CountHtang, anglRas, rHarnOsn, rHarnPla, Sh, D, V, CountPoint, anglPlatX, anglPlatY, anglPlatZ, alfo[6], alfp[6], Lo, Lp, L, Lmin, Lmax, heightSh[6], xyz[3][2], rastMezhO_P;

var mZ=[], PloshadiSech=[], VV, Vmin, Vmax, dmin, dmax, Shmin, Shmax, step_V, step_Dl, step_Sh, lmin, lmax, arash, alf = [[],[]], hSh=[], hmin, hmax, step_h, step_x, step_y, step;


var OsnR		= 160;  //Радиус основания
var Rr			= 2;	//R/r
var Plat_r		= 80;	//Радиус платформы

var Sh 			= 100;
var D 			= 100;
var V 			= 100;

var CountHtang 	= 3;	//Колличество штанг
var CountPoint	= 100; 	//Колличество точек
var anglRash 	= 11;
var anglPlatX	= 0;	
var anglPlatY	= 0;
var anglPlatZ	= 0;

var k 			= [[],[],[],[]];
var alf 		= [[0,0,0,0,0,0],[0,0,0,0,0,0]];


function raschet_dlin_shtang() {

    OsnR        = parseInt($("#OsnR").val(),10);
    Rr          = parseInt($("#Rr").val(),10);
    Plat_r      = parseInt($("#Plat_r").val(),10);

    Sh          = parseInt($("#Sh").val(),10);
    D           = parseInt($("#D").val(),10);
    V           = parseInt($("#V").val(),10);

    CountHtang  = parseInt($("#CountHtang").val(),10);
    CountPoint  = parseInt($("#CountPoint").val(),10);  
    anglRash    = parseInt($("#anglRash").val(),10);
    anglPlatX   = parseInt($("#anglPlatX").val(),10);    
    anglPlatY   = parseInt($("#anglPlatY").val(),10);
    anglPlatZ   = parseInt($("#anglPlatZ").val(),10);




	let DlinaShtang = []; //CountHtang
    //Первая строка
    k[0][0]=Math.cos(anglPlatY*Math.PI/180)*Math.cos(anglPlatZ*Math.PI/180);
    k[0][1]=-1 * Math.cos(anglPlatY * Math.PI / 180) * Math.sin(anglPlatZ * Math.PI / 180);
    k[0][2]=Math.sin(anglPlatY*Math.PI/180);
    k[0][3]=Sh;
    //Вторая строка
    k[1][0] = Math.sin(anglPlatX * Math.PI / 180) * Math.sin(anglPlatY * Math.PI / 180) * Math.cos(anglPlatZ * Math.PI / 180) + Math.cos(anglPlatX * Math.PI / 180) * Math.sin(anglPlatZ * Math.PI / 180);
    k[1][1] = -1 * Math.sin(anglPlatX * Math.PI / 180) * Math.sin(anglPlatY * Math.PI / 180) * Math.sin(anglPlatZ * Math.PI / 180) + Math.cos(anglPlatX * Math.PI / 180) * Math.cos(anglPlatZ * Math.PI / 180);
    k[1][2] = -1 * Math.sin(anglPlatX * Math.PI / 180) * Math.cos(anglPlatY * Math.PI / 180);
    k[1][3]=D;
    //Третья строка
    k[2][0] = -1 * Math.cos(anglPlatX * Math.PI / 180) * Math.sin(anglPlatY * Math.PI / 180) * Math.cos(anglPlatZ * Math.PI / 180) + Math.sin(anglPlatX * Math.PI / 180) * Math.sin(anglPlatZ * Math.PI / 180);
    k[2][1] = Math.cos(anglPlatX * Math.PI / 180) * Math.sin(anglPlatY * Math.PI / 180) * Math.sin(anglPlatZ * Math.PI / 180) + Math.sin(anglPlatZ * Math.PI / 180) * Math.cos(anglPlatZ * Math.PI / 180);
    k[2][2] = Math.cos(anglPlatX * Math.PI / 180) * Math.cos(anglPlatY * Math.PI / 180);
    k[2][3]=V;
    //Четвёртая строка
    k[3][0]=0;
    k[3][1]=0;
    k[3][2]=0;
    k[3][3]=1;

    Vmin = (OsnR - Plat_r) / (Math.sin(anglRash/2 * Math.PI / 180) / Math.cos(anglRash/2 * Math.PI / 180));
    Vmax = Vmin + V;
    dmin = -1 * D / 2;
    dmax = D / 2;
    Shmin = -1 * Sh / 2;
    Shmax = Sh / 2;
    step_V = (Vmax - Vmin) / (CountPoint - 1);
    step_Dl = (dmax - dmin) / (CountPoint - 1);
    step_Sh = (Shmax - Shmin) / (CountPoint - 1);
    lmin = 1E+16;
    lmax = 0;


    for (var i = 0; i < CountHtang; i++) {

    	for (var j = 0; j < CountPoint; j++) {
    		k[2][3]=Vmin+j*step_V;

    		for (var l = 0; l < CountPoint; l++) {
    			k[1][3]=dmin+l*step_Dl;

    			for (var m = 0; m < CountPoint; m++) {
    				k[0][3] = Shmin +m * step_Sh;
                    DlinaShtang[i]= fDlinaShtan(Plat_r,OsnR,0,0,0,alf[1][i], alf[0][i],0);
                    if(DlinaShtang[i]<lmin) lmin = DlinaShtang[i];
                    if(DlinaShtang[i]>lmax) lmax = DlinaShtang[i];
    			}
    		}
    	}

    	let rastMezhO_P = Math.sqrt(Math.pow(lmin,2)-Math.pow(OsnR-Plat_r,2));

    	$("#rastMezhO_P").val(rastMezhO_P);

        // Lmax->set_value(lmax);
        // Lmin->set_value(lmin);
    }
    
    $("#lmax").val(lmax);
    $("#lmin").val(lmin);
    alert("Расчёт длин штанг окончен!");
}


function fDlinaShtan(r1, r, Lx, Ly, Lz, alfa, alfao, vsharnapla) {
	return Math.sqrt(Math.pow((r1 * Math.cos(alfa) * k[0][0] + r1 * Math.sin(alfa) * k[0][1] + 0 * k[0][2] + 1 * k[0][3] + Lx - ((r) * Math.cos(alfao))), 2) +Math.pow(((r1 * Math.cos(alfa) * k[1][0] + r1 * Math.sin(alfa) * k[1][1] + 0 * k[1][2] + k[1][3] + Ly - ((r) * Math.sin(alfao)))), 2) + Math.pow((r1 * Math.cos(alfa) * k[2][0] + r1 * Math.sin(alfa) * k[2][1] + k[2][3] + Lz + vsharnapla), 2));
}

$(document).ready(function(){
    $("#OsnR").val(OsnR);
    $("#Rr").val(Rr);
    $("#Plat_r").val(Plat_r);
    $("#Sh").val(Sh);
    $("#D").val(D);
    $("#V").val(V);
    $("#CountHtang").val(CountHtang);
    $("#CountPoint").val(CountPoint);
    $("#anglRash").val(anglRash);
    $("#anglPlatX").val(anglPlatX);
    $("#anglPlatY").val(anglPlatY);
    $("#anglPlatZ").val(anglPlatZ);
});
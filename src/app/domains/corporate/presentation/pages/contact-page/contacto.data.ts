export interface Branch {
  lat: number;
  lng: number;
  nombre: string;
  direccion: string;
  email: string;
  telefono: string;
  horarios: string;
  ciudad: string;
  estado: string;
  tipo?: 'sucursal' | 'distribuidor';
}

export interface Locator {
  name: string;
  kind: 'Sucursal' | 'CEDIS' | 'Distribuidor';
  address: string;
  phones: string[];
  email?: string;
}

export const CITY_COORDINATES: Record<string, [number, number]> = {
  'Ciudad de México': [19.4326, -99.1332],
  Guadalajara: [20.66651, -103.37203],
  Monterrey: [25.6866, -100.3161],
  Puebla: [19.0414, -98.2063],
  Querétaro: [20.5881, -100.388],
  Tijuana: [32.5149, -117.0382],
  León: [21.1606, -101.7116],
  Toluca: [19.2826, -99.6557],
  Yucatán: [21.0568604, -89.644909],
  Xalapa: [19.530488, -96.934478]
};

export const CITIES = [
  'Ciudad de México',
  'Guadalajara',
  'Monterrey',
  'Puebla',
  'Querétaro',
  'Tijuana',
  'Xalapa',
  'León',
  'Toluca',
  'Yucatán'
];

export const BRANCHES: Branch[] = [
  {
    lat: 19.4923666, lng: -99.1578552, nombre: 'Café Etrusca CEDIS Vallejo',
    direccion: 'Pte. 134 413, Industrial Vallejo, Azcapotzalco, 02300 Ciudad de México, CDMX',
    email: 'atencion@cafeetrusca.com', telefono: '55 41 66 8777',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS', ciudad: 'Ciudad de México', estado: 'CDMX'
  },
  {
    lat: 19.4257134, lng: -99.16132894907378, nombre: 'Sucursal Zona Rosa',
    direccion: 'Liverpool #91, Colonia Juárez, CDMX',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    email: 'zonarosa@cafeetrusca.com', telefono: '(55) 5533 9402 / 04 / 05 / 06',
    ciudad: 'Ciudad de México', estado: 'CDMX'
  },
  {
    lat: 19.399054, lng: -99.134663, nombre: 'Sucursal Viaducto',
    direccion: 'Miguel Ángel #2-A, Colonia Moderna, CDMX',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    email: 'viaducto@cafeetrusca.com', telefono: '(55) 5579 9981 / 5579 9251',
    ciudad: 'Ciudad de México', estado: 'CDMX'
  },
  {
    lat: 19.25494, lng: -99.6149, nombre: 'Sucursal Toluca',
    direccion: 'Calle Pedro Ascencio #529 Edificio 2 Local 1, Barrio de Santa Cruz, Metepec, Estado de México',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    email: 'toluca@cafeetrusca.com', telefono: '(722) 238 2566 / (01 722) 238 2567',
    ciudad: 'Toluca', estado: 'Toluca'
  },
  {
    lat: 32.506225, lng: -116.979203, nombre: 'Sucursal Tijuana',
    direccion: 'Plaza Ximena, Local 5, Boulevard Díaz Ordaz #13601, Col. López Lucio',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    telefono: '(664) 681 6600 / 11', email: 'tijuana@cafeetrusca.com',
    ciudad: 'Tijuana', estado: 'Baja California'
  },
  {
    lat: 20.588084, lng: -100.403696, nombre: 'Sucursal Querétaro',
    direccion: 'Tecnológico Sur #10, Colonia Niños Héroes',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    email: 'queretaro@cafeetrusca.com', telefono: '(442) 234 5077 / 7152 / 3562',
    ciudad: 'Querétaro', estado: 'Querétaro'
  },
  {
    lat: 19.05133, lng: -98.226499, nombre: 'Sucursal Puebla',
    direccion: 'Boulevard Atlixco #1520, Col. La Paz, Local 1',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    email: 'puebla@cafeetrusca.com', telefono: '(222) 230 5300 / 5896',
    ciudad: 'Puebla', estado: 'Puebla'
  },
  {
    lat: 25.661205, lng: -100.399708, nombre: 'Sucursal Monterrey',
    direccion: 'Centro comercial Los Mezquites, Av. Vasconcelos #501, Interior 1 Poniente, esquina con Zaragoza, Col. Centro, Nuevo León',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    email: 'monterrey@cafeetrusca.com', telefono: '(81) 8338 1383 / 1857',
    ciudad: 'Monterrey', estado: 'Nuevo León'
  },
  {
    lat: 21.099884, lng: -101.67006, nombre: 'Sucursal León',
    direccion: 'Local E, Plaza San Rafael, Boulevard Juan José Torres Landa, Oriente #1005, Col. Puerta de San Rafael, Ciudad de León, Guanajuato',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    telefono: '(477) 212 3798 / 3800 / 962 221', email: 'leon@cafeetrusca.com',
    ciudad: 'León', estado: 'Guanajuato'
  },
  {
    lat: 20.66651, lng: -103.37203, nombre: 'Sucursal Guadalajara',
    direccion: 'Av Niños Héroes 2161, Americana, Moderna, 44190 Guadalajara, Jal.',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    email: 'guadalajara@cafeetrusca.com', telefono: '(33) 3827 5286 / 3827 5287',
    ciudad: 'Guadalajara', estado: 'Jalisco'
  },
  {
    lat: 19.492441, lng: -99.155717, nombre: 'Centro de Tostión Etrusca Vallejo',
    direccion: 'Av. Poniente 134 #413, Bodega B2, entrada por un lado de las vías del tren, Industrial Vallejo, Azcapotzalco, Ciudad de México, CDMX',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    telefono: '(55) 5579 9860 / (55) 5590 5407 / (55) 5604 1159',
    email: 'atencion@cafeetrusca.com', ciudad: 'Ciudad de México', estado: 'CDMX'
  },
  {
    lat: 19.530488, lng: -96.934478, nombre: 'Sucursal Xalapa',
    direccion: 'Plaza del Teatro, Local 5 Avenida Ignacio de la llave #35, Col. Guadalupe Rodríguez',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    telefono: '(228) 812 0130 / 0660', email: 'xalapa@cafeetrusca.com',
    ciudad: 'Xalapa', estado: 'Xalapa'
  },
  {
    lat: 21.05604, lng: -89.642618, nombre: 'Sucursal Mérida',
    direccion: 'Av. Maquiladoras 501, Col 27, 97302 Mérida, Yuc.',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    telefono: '9986740024', email: 'merida@cafeetrusca.com',
    ciudad: 'Yucatán', estado: 'Yucatán'
  },
  {
    lat: 19.3571004, lng: -99.0946023, nombre: 'Sucursal Iztapalapa',
    direccion: 'Calle Porfirio Díaz, número 113, Col. San Lucas, Alcaldía Iztapalapa, C.P. 09000, Ciudad de México',
    horarios: 'L-V 09:00-18:00 HRS SABADO 09:00-13:00 HRS',
    telefono: '5541668737', email: 'iztapalapa@cafeetrusca.com',
    ciudad: 'Ciudad de México', estado: 'CDMX'
  }
];

export const LOCATORS: Locator[] = [
  { name: 'Etrusca Comercial - Distribución General', kind: 'CEDIS', address: 'Pte. 134 413 Industrial Vallejo Azcapotzalco Ciudad de México, CDMX, C.P. 02300', phones: ['(55) 5579 9860', '(55) 5590 5407', '(55) 5604 1159'], email: 'info@cafeetrusca.com' },
  { name: 'Sucursal Zona Rosa', kind: 'Sucursal', address: 'Liverpool 91, Juárez, Cuauhtémoc, Col. Juárez, CDMX, C.P. 06600', phones: ['(55) 5533 9402'], email: 'zonarosa@cafeetrusca.com' },
  { name: 'Sucursal Viaducto', kind: 'Sucursal', address: 'Miguel Angel #2-A, Moderna, Benito Juárez, Ciudad de México, CDMX, C.P. 03510', phones: ['(55) 5579 9981'], email: 'viaducto@cafeetrusca.com' },
  { name: 'Sucursal Guadalajara', kind: 'Sucursal', address: 'Av Niños Héroes 2161, Americana, Moderna, Guadalajara, Jal. C.P. 44190', phones: ['(33) 3827 5286'], email: 'guadalajara@cafeetrusca.com' },
  { name: 'Sucursal Monterrey', kind: 'Sucursal', address: 'Local 1 Avenida José Vasconcelos Centro Comercial, Pte. 501, Casco Urbano, San Pedro Garza García, N.L. C.P. 66200', phones: ['(81) 8338 1383'], email: 'monterrey@cafeetrusca.com' },
  { name: 'Sucursal Puebla', kind: 'Sucursal', address: 'Boulevard Atlixco 1520, La Paz, Heroica Puebla de Zaragoza, Pue. C.P. 72180', phones: ['(222) 230 5300'], email: 'puebla@cafeetrusca.com' },
  { name: 'Sucursal Querétaro', kind: 'Sucursal', address: 'Tecnológico Sur 10, Colonia Niños Héroes, Querétaro.', phones: ['(442) 234 5077'], email: 'queretaro@cafeetrusca.com' },
  { name: 'Sucursal Tijuana', kind: 'Sucursal', address: 'Boulevard Díaz Ordaz 13601, Lucio Lopez, Plaza Ximena Local 5, Tijuana', phones: ['(664) 681 6600'], email: 'tijuana@cafeetrusca.com' },
  { name: 'Sucursal Xalapa', kind: 'Sucursal', address: 'Av Ignacio de la Llave 35, Guadalupe Rodríguez, Xalapa', phones: ['(228) 812 0130'], email: 'xalapa@cafeetrusca.com' },
  { name: 'Sucursal León', kind: 'Sucursal', address: 'Boulevard Torres Landa Oriente, Priv. San Rafael 1005, León de los Aldama, Gto. C.P. 37480', phones: ['(477) 212 3798'], email: 'leon@cafeetrusca.com' },
  { name: 'Sucursal Toluca', kind: 'Sucursal', address: 'Calle Pedro Ascencio 529-Local 1 2, Santa Cruz, Metepec, Méx. C.P. 52140', phones: ['(722) 238 2566'], email: 'toluca@cafeetrusca.com' },
  { name: 'Sucursal Mérida', kind: 'Sucursal', address: 'Av. Maquiladoras 501, Col 27, 97302 Mérida, Yuc.', phones: ['(998) 674 0024'], email: 'merida@cafeetrusca.com' },
  { name: 'Sucursal Iztapalapa', kind: 'Sucursal', address: 'Calle Porfirio Díaz, número 113, Col. San Lucas, Alcaldía Iztapalapa, C.P. 09000, Ciudad de México', phones: ['(55) 4166 8737'], email: 'iztapalapa@cafeetrusca.com' },
  { name: 'Centro de Distribución Zapopan', kind: 'CEDIS', address: 'Industria Galletera #121, Col. Industrial Zapopan Norte, Zapopan, Jalisco', phones: ['(33) 3165 5527', '(33) 3365 0595'], email: 'zapopan@cafeetrusca.com' },
  { name: 'Distribuidor Los Mochis', kind: 'Distribuidor', address: 'Miguel Hidalgo y Costilla #120 Ote-L-A, Col. Centro, CP 81200 Los Mochis, Sin.', phones: ['(668) 815 9361'] },
  { name: 'Distribuidor Chihuahua', kind: 'Distribuidor', address: 'Av. 3a pte 711, Col. Sector Poniente. CP 33000. Delicias, Chihuahua', phones: ['(614) 553 4973'], email: 'etrusca.chihuahua@gmail.com' },
  { name: 'Distribuidor Coyoacán', kind: 'Distribuidor', address: 'Amores 1734 Local D, Col. del Valle, CP 03104 Alcaldía Benito Juárez.', phones: ['(55) 7864 1854', '(55) 8046 1492', '(55) 1632 9123'] },
  { name: 'Distribuidor Satélite', kind: 'Distribuidor', address: 'C. Viveros de Asís 13-local 104, Hab Viveros de la Loma, 54080 Tlalnepantla, Méx.', phones: ['(55) 2628 0688'], email: 'sateliteetrusca@gmail.com' },
  { name: 'Distribuidor Del Valle', kind: 'Distribuidor', address: 'Mercado del Valle Coyoacán Del Valle 03100 Benito Juárez, D.F.', phones: ['(55) 5669 1994'], email: 'cafeprofesional1@cafepassmar.com' },
  { name: 'Distribuidor Naucalpan', kind: 'Distribuidor', address: 'Av. Manuel Avila Camacho 92, Col. El Conde, Naucalpan, Estado de México', phones: ['(55) 6147 1502'], email: 'etruscanaucalpan@telmexmail.com' },
  { name: 'Distribuidor Coapa', kind: 'Distribuidor', address: 'Avenida Santa Ana, Coyoacán Esquina Romero Ibañez, Plaza Zitia Local 4', phones: ['(55) 5697 0265'], email: 'etruscacoapa@yahoo.com.mx' },
  { name: 'Distribuidor Revolución', kind: 'Distribuidor', address: 'Amado Nervo No 3, Esquina Mariano Azuela Santa Maria La rivera, 06400 Mexico City, Mexico', phones: ['(55) 5566 2047'], email: 'etruscarevolucion@outlook.com' },
  { name: 'Distribuidor Aguascalientes', kind: 'Distribuidor', address: 'Av. de la Convención de 1914 Nte. exterior 1201, Fracc. Las Arboledas, C.P. 20020, Aguascalientes, Ags.', phones: ['(449) 996 4871', '(449) 197 8110'], email: 'etruscaags1@hotmail.com' },
  { name: 'Distribuidor La Paz', kind: 'Distribuidor', address: 'Sonora #145, Esquina Madero, Col. Pueblo Nuevo, La Paz, BCS', phones: ['(612) 1222 7209'], email: 'etruscalapaz@gmail.com' },
  { name: 'Distribuidor Los Cabos', kind: 'Distribuidor', address: 'Hidalgo y Libertad S/N, Col. Centro, Los Cabos, BCS', phones: ['(624) 143 1552'], email: 'etruscacabo@gmail.com' },
  { name: 'Distribuidor Pachuca', kind: 'Distribuidor', address: 'San Felipe de las Torres 303, Local A, Colonia Coscotitlán, Pachuca, Hidalgo', phones: ['(771) 254 0300'], email: 'etrusca.hidalgo@hotmail.com' },
  { name: 'Distribuidor San Luis Potosí', kind: 'Distribuidor', address: 'Calle Naranjos 440, San Luis Potosí, S.L.P.', phones: ['(444) 811 7822'], email: 'etruscaslp@gmail.com' }
];
export const DISTRIBUTORS: Branch[] = [
  {
    lat: 25.7928058, lng: -108.990188, nombre: 'Distribuidor Los Mochis',
    direccion: 'Miguel Hidalgo y Costilla #120 Ote-L-A, Col. Centro, CP 81200 Los Mochis, Sin.',
    email: '', telefono: '(668) 815 9361', horarios: 'Distribuidor autorizado',
    ciudad: 'Los Mochis', estado: 'Sinaloa', tipo: 'distribuidor'
  },
  {
    lat: 28.1958584, lng: -105.4791826, nombre: 'Distribuidor Chihuahua',
    direccion: 'Av. 3a pte 711, Col. Sector Poniente. CP 33000. Delicias, Chihuahua',
    email: 'etrusca.chihuahua@gmail.com', telefono: '(614) 553 4973', horarios: 'Distribuidor autorizado',
    ciudad: 'Delicias', estado: 'Chihuahua', tipo: 'distribuidor'
  },
  {
    lat: 20.7432094, lng: -103.3899373, nombre: 'Centro de Distribución Zapopan',
    direccion: 'Industria Galletera #121, Col. Industrial Zapopan Norte, Zapopan, Jalisco',
    email: 'zapopan@cafeetrusca.com', telefono: '(33) 3165 5527 / (33) 3365 0595', horarios: 'Centro de distribución',
    ciudad: 'Zapopan', estado: 'Jalisco', tipo: 'distribuidor'
  },
  {
    lat: 19.395249, lng: -99.1628066, nombre: 'Distribuidor Coyoacán',
    direccion: 'Amores 1734 Local D, Col. del Valle, CP 03104 Alcaldía Benito Juárez.',
    email: '', telefono: '(55) 7864 1854 / (55) 8046 1492 / (55) 1632 9123', horarios: 'Distribuidor autorizado',
    ciudad: 'Ciudad de México', estado: 'CDMX', tipo: 'distribuidor'
  },
  {
    lat: 19.5220115, lng: -99.2128239, nombre: 'Distribuidor Satélite',
    direccion: 'C. Viveros de Asís 13-local 104, Hab Viveros de la Loma, 54080 Tlalnepantla, Méx.',
    email: 'sateliteetrusca@gmail.com', telefono: '(55) 2628 0688', horarios: 'Distribuidor autorizado',
    ciudad: 'Tlalnepantla', estado: 'Estado de México', tipo: 'distribuidor'
  },
  {
    lat: 19.3957093, lng: -99.1661875, nombre: 'Distribuidor Del Valle',
    direccion: 'Mercado del Valle, Del Valle, 03100 Benito Juárez, CDMX',
    email: 'cafeprofesional1@cafepassmar.com', telefono: '(55) 5669 1994', horarios: 'Distribuidor autorizado',
    ciudad: 'Ciudad de México', estado: 'CDMX', tipo: 'distribuidor'
  },
  {
    lat: 19.470166, lng: -99.230853, nombre: 'Distribuidor Naucalpan',
    direccion: 'Av. Manuel Ávila Camacho 92, Col. El Conde, Naucalpan, Estado de México',
    email: 'etruscanaucalpan@telmexmail.com', telefono: '(55) 6147 1502', horarios: 'Distribuidor autorizado',
    ciudad: 'Naucalpan', estado: 'Estado de México', tipo: 'distribuidor'
  },
  {
    lat: 19.3083921, lng: -99.1224987, nombre: 'Distribuidor Coapa',
    direccion: 'Avenida Santa Ana, Coyoacán esquina Romero Ibañez, Plaza Zitia Local 4',
    email: 'etruscacoapa@yahoo.com.mx', telefono: '(55) 5697 0265', horarios: 'Distribuidor autorizado',
    ciudad: 'Ciudad de México', estado: 'CDMX', tipo: 'distribuidor'
  },
  {
    lat: 19.4430662, lng: -99.1568012, nombre: 'Distribuidor Revolución',
    direccion: 'Amado Nervo No 3, esquina Mariano Azuela, Santa María la Ribera, 06400 CDMX',
    email: 'etruscarevolucion@outlook.com', telefono: '(55) 5566 2047', horarios: 'Distribuidor autorizado',
    ciudad: 'Ciudad de México', estado: 'CDMX', tipo: 'distribuidor'
  },
  {
    lat: 21.912, lng: -102.296, nombre: 'Distribuidor Aguascalientes',
    direccion: 'Av. de la Convención de 1914 Nte. exterior 1201, Fracc. Las Arboledas, C.P. 20020, Aguascalientes, Ags.',
    email: 'etruscaags1@hotmail.com', telefono: '(449) 996 4871 / (449) 197 8110', horarios: 'Distribuidor autorizado',
    ciudad: 'Aguascalientes', estado: 'Aguascalientes', tipo: 'distribuidor'
  },
  {
    lat: 24.1419799, lng: -110.3244212, nombre: 'Distribuidor La Paz',
    direccion: 'Sonora #145, Esquina Madero, Col. Pueblo Nuevo, La Paz, BCS',
    email: 'etruscalapaz@gmail.com', telefono: '(612) 122 7209', horarios: 'Distribuidor autorizado',
    ciudad: 'La Paz', estado: 'Baja California Sur', tipo: 'distribuidor'
  },
  {
    lat: 23.0598364, lng: -109.7025148, nombre: 'Distribuidor Los Cabos',
    direccion: 'Hidalgo y Libertad S/N, Col. Centro, Los Cabos, BCS',
    email: 'etruscacabo@gmail.com', telefono: '(624) 143 1552', horarios: 'Distribuidor autorizado',
    ciudad: 'Los Cabos', estado: 'Baja California Sur', tipo: 'distribuidor'
  },
  {
    lat: 20.1082656, lng: -98.7519283, nombre: 'Distribuidor Pachuca',
    direccion: 'San Felipe de las Torres 303, Local A, Colonia Coscotitlán, Pachuca, Hidalgo',
    email: 'etrusca.hidalgo@hotmail.com', telefono: '(771) 254 0300', horarios: 'Distribuidor autorizado',
    ciudad: 'Pachuca', estado: 'Hidalgo', tipo: 'distribuidor'
  },
  {
    lat: 22.144579, lng: -101.0067606, nombre: 'Distribuidor San Luis Potosí',
    direccion: 'Calle Naranjos 440, San Luis Potosí, S.L.P.',
    email: 'etruscaslp@gmail.com', telefono: '(444) 811 7822', horarios: 'Distribuidor autorizado',
    ciudad: 'San Luis Potosí', estado: 'San Luis Potosí', tipo: 'distribuidor'
  }
];

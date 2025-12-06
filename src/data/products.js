import { productImages } from '../assets/images'

export const products = [
  { id: 1, name: 'Leche Entera Purísima', category: 'Leche en polvo', description: 'Leche en polvo entera Purísima de alta calidad, ideal para uso comercial y alimentario.', image: productImages.leche_purisima, accent: 'accent-blue' },
  { id: 2, name: 'Leche Descremada Dairy America', category: 'Leche en polvo', description: 'Leche en polvo descremada Dairy America de alta calidad, ideal para productos bajos en grasa.', image: productImages.dairy_america, accent: 'accent-red' },
  { id: 3, name: 'Leche Fonterra New Zealand', category: 'Leche en polvo', description: 'Leche en polvo importada Fonterra (NZ). Alta solubilidad y aporte proteico; ideal para consumo directo y para uso industrial en elaboración de alimentos.', image: productImages.leche_nz, accent: 'accent-beige' },
  /* Harina P.A.N (id:4) and Café Grano (id:5) removed per request */
  { id: 6, name: 'Aceite de Oliva', category: 'Abarrotes', description: 'Aceite de oliva extra virgen, ideal para uso doméstico y preparación de alimentos con sabor y calidad.', image: productImages.aceite || productImages.sello_rojo, accent: 'accent-green' },
  { id: 9, name: 'Suero de leche Colun', category: 'Leche en polvo', description: 'Suero de leche Colun, de gran solubilidad y sabor neutro.', image: productImages.leche_colun, accent: 'accent-beige' },
  { id: 10, name: 'Café la Cholita', category: 'Café', description: 'Café la Cholita — tueste seleccionado y sabor tradicional; envasado para consumo y preparado de bebidas con carácter.', image: productImages.cholita, accent: 'accent-green' },
    { id: 11, name: 'Gelco', category: 'Abarrotes', description: 'Gelatina instantánea ideal para preparar postres rápidos y deliciosos — ligera, fresca y fácil de preparar.', image: productImages.gelco, accent: 'accent-brown' },
    { id: 12, name: 'Harina Pan', category: 'Harinas', description: 'Harina precocida de maíz, perfecta para hacer arepas, empanadas, hallacas o tamales; tradicional y versátil en la cocina.', image: productImages.pan, accent: 'accent-orange' },
    { id: 13, name: 'Harina Pan Amarilla', category: 'Harinas', description: 'Harina precocida de maíz, perfecta para hacer arepas, empanadas, hallacas o tamales; tradicional y versátil en la cocina.', image: productImages.pan_amarilla, accent: 'accent-yellow' },
    { id: 14, name: 'Harina Pan para Cachapa', category: 'Harinas', description: 'Mezcla especial de maíz para preparar cachapas venezolanas — suaves, esponjosas y con auténtico sabor casero.', image: productImages.pan_cachapa, accent: 'accent-orange' },
  { id: 15, name: 'Café Mena 1kg', category: 'Café', description: 'Café tostado de aroma intenso y sabor equilibrado. Presentación familiar de 1 kg para disfrutar calidad todos los días.', image: productImages.mena_1kg, accent: 'accent-pink' },
  { id: 16, name: 'Café Mena 1/4', category: 'Café', description: 'Presentación compacta de 250 g. Café Mena con sabor auténtico y cuerpo balanceado, ideal para consumo diario o para llevar.', image: productImages.mena_un_cuarto, accent: 'accent-pink' },
    { id: 17, name: 'Café Sello Rojo', category: 'Café', description: 'Café con sabor clásico e intenso, ideal para empezar el día con energía y tradición.', image: productImages.sello_rojo, accent: 'accent-red' }
  ,
  { id: 21, name: 'Maca', category: 'Abarrotes', description: 'Producto andino natural, reconocido por sus beneficios nutricionales y energéticos — perfecto para una dieta equilibrada.', image: productImages.maca || productImages.harina_preview || productImages.harina_arepasan, accent: 'accent-beige' },
  { id: 22, name: 'Cacao', category: 'Abarrotes', description: 'Cacao en grano natural: aroma profundo y sabor terroso, ideal para tostar, moler o infusionar en recetas artesanales.', image: productImages.cacao || productImages.cafe_preview || productImages.azucar, accent: 'accent-brown' },
  { id: 23, name: 'Cacao en Polvo', category: 'Abarrotes', description: 'Cacao en polvo 100% natural, perfecto para repostería y bebidas calientes — fácil de disolver y con un intenso sabor a chocolate.', image: productImages.cacao_polvo || productImages.cafe_preview || productImages.azucar, accent: 'accent-brown' },
  { id: 18, name: 'Harina Arepasan', category: 'Harinas', description: 'Mezcla de maíz precocido para arepas — fácil de preparar y con textura suave y flexible, ideal para comidas rápidas o tradicionales.', image: productImages.arepasan || productImages.harina_arepasan, accent: 'accent-orange' },
  { id: 19, name: 'Harina Nieve', category: 'Harinas', description: 'Harina ligera que puede usarse en diversas recetas, perfecta para repostería o preparación de masas suaves.', image: productImages.nieve || productImages.leche_preview, accent: 'accent-blue' },
  { id: 20, name: 'Café Castellani', category: 'Café', description: 'Café seleccionado para quienes valoran un sabor suave pero presente, ideal para cualquier momento del día.', image: productImages.castellani || productImages.azucar, accent: 'accent-beige' },
  { id: 24, name: 'Mayonesa Mavesa', category: 'Abarrotes', description: 'Mayonesa cremosa y tradicional — excelente aliada para salsas, emparedados y recetas caseras.', image: productImages.mavesa || productImages.aceite || productImages.leche_preview, accent: 'accent-yellow' }

  ,{ id: 25, name: 'Anís Cartujo', category: 'Abarrotes', description: 'Añejo venezolano, suave y aromático; ideal solo, en cócteles o en recetas tradicionales.', image: productImages.anis_cartujo || productImages.azucar, accent: 'accent-brown' }
]

export default products

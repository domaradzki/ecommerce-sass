import { parseStringPromise } from 'xml2js';

export async function GET(request) {
  const res = await fetch(
    'https://api.ikonka.com.pl/api2/index.php/request/?format=xml&hash=4b30b263734ce71f3fa5c5042440c160b015e10e&variant=b&lang=pl&currency=PLN',
    // 'https://www.gimmik.net/?id=sklep&mode=userpanel&act=data_export&ext=dl&r=1&s=55&hydk=AEGMPPQ0VNZ1',
  );
  const items = await res.text();
  const jsonData = await parseStringPromise(items, {
    explicitArray: false,
  });

  return jsonData;
}

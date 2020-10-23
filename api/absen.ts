import { NowRequest, NowResponse } from '@vercel/node';
import { isRequestBody } from '../src/common/request';
import { absen } from './../src/index';
import { TibsenError } from '../src/exception/base';

export default async function(
  req: NowRequest,
  res: NowResponse,
): Promise<NowResponse> {
  try {
    const body = req.body;

    isRequestBody(body);

    await absen(body);

    return res.status(204);
  } catch (err) {
    const error = err as TibsenError;

    return res.status(error.code)
      .json({
        error: error.message,
      });
  }
}

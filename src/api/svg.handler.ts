import type { Request, Response } from 'express';
import { z } from 'zod';
import { fetchTopLangs } from '~/core/fetch-top-langs';
import { renderTopLangs } from '~/core/render-top-langs';
import { handleError } from './handle-error';

const querySchema = z.object({
	userName: z.coerce.string(),
	limit: z.coerce.number().int().optional(),
	theme: z.enum(['light', 'dark']).optional(),
});

export const svgHandler = async (req: Request, res: Response) => {
	try {
		const { userName, limit, theme } = querySchema.parse(req.query);
		const langs = await fetchTopLangs({ userName, limit: limit ?? 10 });
		const svg = await renderTopLangs({ userName, langs, theme: theme ?? 'light', output: 'svg' });
		res.setHeader('Content-Type', 'image/svg+xml');
		res.send(svg);
	} catch (err) {
		handleError(err, res);
	}
};

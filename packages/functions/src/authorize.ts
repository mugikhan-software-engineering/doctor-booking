import type { APIGatewayProxyEvent, Context, APIGatewaySimpleAuthorizerWithContextResult } from 'aws-lambda';
import { Resource } from 'sst';
import jwt from 'jsonwebtoken';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewaySimpleAuthorizerWithContextResult<{ userId: string }>> => {
	try {
		// Get the JWT from the Authorization header
		const authHeader = event.headers?.Authorization || event.headers?.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			console.error('No auth header found');
			return generateDenyResponse();
		}
		const [scheme, token] = authHeader.split(' ', 2);
		if ((scheme || '').toLowerCase() !== 'bearer') {
			console.error("Authorization header value did not start with 'Bearer'.");
			return generateDenyResponse();
		}
		const SUPABASE_JWT_SECRET = Resource.SupabaseJwtSecret.value;

		const payload = jwt.verify(token, SUPABASE_JWT_SECRET);

		// Check if sub exists and is a string
		if (!payload.sub || typeof payload.sub !== 'string') {
			console.error('Invalid or missing sub in JWT payload');
			return generateDenyResponse();
		}

        return generateAllowResponse(payload.sub);
	} catch (error) {
		console.error('Error validating JWT:', error);
		return generateDenyResponse();
	}
};

const generateAllowResponse = (principalId: string): APIGatewaySimpleAuthorizerWithContextResult<{ userId: string }> => {
	return {
		isAuthorized: true,
		context: {
			userId: principalId
		}
	};
};

const generateDenyResponse = (): APIGatewaySimpleAuthorizerWithContextResult<{ userId: string }> => {
	return {
		isAuthorized: false,
		context: {
			userId: ''
		}
	};
};

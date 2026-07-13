export interface OAuthConfig { clientId: string; clientSecret: string; redirectUri: string; authorizationUrl: string; tokenUrl: string; scopes: string[]; }
export interface OAuthToken { accessToken: string; refreshToken?: string; expiresIn: number; tokenType: string; scope: string; }
export function generateAuthorizationUrl(config: OAuthConfig, state: string): string {
  const params = new URLSearchParams({ client_id: config.clientId, redirect_uri: config.redirectUri, response_type: 'code', scope: config.scopes.join(' '), state });
  return config.authorizationUrl + '?' + params.toString();
}
export async function exchangeCode(config: OAuthConfig, code: string): Promise<OAuthToken> { const resp = await fetch(config.tokenUrl, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: config.redirectUri, client_id: config.clientId, client_secret: config.clientSecret }) }); return resp.json(); }

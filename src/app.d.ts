// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			profile: import('$lib/server/auth').SessionValidationResult['profile'];
			session: import('$lib/server/auth').SessionValidationResult['session'];
		}
	}
}

export {};

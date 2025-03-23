const apiBaseUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v${process.env.NEXT_PUBLIC_API_VERSION}`;

// auth
export const loginUrl = `${apiBaseUrl}/users/login`;
export const profileUpdateUrl = `${apiBaseUrl}/users/update`;
export const accountInfoUrl = `${apiBaseUrl}/users/info`;
export const changeUrl = `${apiBaseUrl}/users/passwordchange`;
export const avatarUrl = `${apiBaseUrl}/users/avatar`;
export const adminAddUrl = `${apiBaseUrl}/admins/`;

// branch
export const branchListUrl = `${apiBaseUrl}/branches/`;
export const branchCreateUrl = `${apiBaseUrl}/branches/`;
export const branchUpdateUrl = `${apiBaseUrl}/branches/`;

// proposal
export const proposalListUrl = `${apiBaseUrl}/proposals/`;
export const proposalCreateUrl = `${apiBaseUrl}/proposals/`;
export const proposalUpdateUrl = `${apiBaseUrl}/proposals/`;
export const proposalShowUrl = `${apiBaseUrl}/proposals/`;
export const proposalMailUrl = `${apiBaseUrl}/proposals/mail`;

// invoice
export const invoiceListUrl = `${apiBaseUrl}/invoices/`;

// user
export const userListUrl = `${apiBaseUrl}/admins/`;

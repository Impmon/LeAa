const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/aa';

// 通用请求方法
async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// 活动相关API
export const activityApi = {
  // 创建活动
  createActivity: (data: any) => request<number>('/activity/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // 获取活动列表
  listActivities: (params: any) => request<any[]>('/activity/list', {
    method: 'POST',
    body: JSON.stringify(params),
  }),

  // 获取活动详情
  getActivity: (id: string) => request<any>(`/activity/get/${id}`),

  // 报名活动
  joinActivity: (id: string, userId: number, answer: string) => request<void>(`/activity/join/${id}`, {
    method: 'POST',
    body: JSON.stringify({ userId, answer }),
  }),

  // 取消报名
  cancelJoinActivity: (id: string, userId: number) => request<void>(`/activity/cancel-join/${id}`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
};

// 据点相关API
export const hubApi = {
  // 创建据点
  createHub: (data: any) => request<number>('/hub/create', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // 获取据点列表
  listHubs: (params: any) => request<any[]>('/hub/list', {
    method: 'POST',
    body: JSON.stringify(params),
  }),

  // 获取据点详情
  getHub: (id: string) => request<any>(`/hub/get/${id}`),

  // 加入据点
  joinHub: (id: string, userId: number) => request<void>(`/hub/join/${id}`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),

  // 退出据点
  leaveHub: (id: string, userId: number) => request<void>(`/hub/leave/${id}`, {
    method: 'POST',
    body: JSON.stringify({ userId }),
  }),
};

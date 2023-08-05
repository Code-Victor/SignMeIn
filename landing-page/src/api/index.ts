import { FormSchemaType } from "@/components/inc/AddWorkerForm";
import {
  AttendanceRecord,
  GetWorkerAttendanceHistoryResponse,
  GetWorkersResponse,
} from "./types";

export async function addWorker(
  data: FormSchemaType & { access: string }
): Promise<{
  user: {
    id: string;
    email: string;
    username: string;
    is_organization: false;
    is_worker: true;
  };
}> {
  const { access, ...worker } = data;
  const response = await fetch(
    "https://signmein-api.onrender.com/add_workers",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(worker),
    }
  );
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}
export async function getWorkers(data: {
  access: string;
}): Promise<GetWorkersResponse> {
  const { access } = data;
  const response = await fetch(
    `https://signmein-api.onrender.com/organization/list_workers`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}
export async function getWorkerAttendanceHistory(
  access: string
): Promise<GetWorkerAttendanceHistoryResponse> {
  const response = await fetch(
    `https://signmein-api.onrender.com/worker/attendance_history`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}

export async function getQrCode(
  access: string,
  id: number
): Promise<{ organization_id: string; UUID: string }> {
  const response = await fetch(
    `https://signmein-api.onrender.com/organization/${id}/generate_code`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}

export async function clockIn(data: {
  qrcode_id: string;
  access: string;
}): Promise<{
  user: {
    id: number;
    qrcode_id: string;
    date: string;
    clock_in: number;
    clock_out: number;
    worker: number;
  };
}> {
  const { access, ...qrcode } = data;
  const response = await fetch("https://signmein-api.onrender.com/clock_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
    body: JSON.stringify(qrcode),
  });
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}
export async function clockOut(data: {
  qrcode_id: string;
  access: string;
}): Promise<{
  user: {
    id: number;
    qrcode_id: string;
    date: string;
    clock_in: number;
    clock_out: number;
    worker: number;
  };
}> {
  const { access, qrcode_id } = data;
  const response = await fetch(
    `https://signmein-api.onrender.com/clock_out/${qrcode_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}
export async function getWorkerAttendance(
  access: string
): Promise<{ date: string; clock_in: string; clock_out: string }[]> {
  const response = await fetch(
    `https://signmein-api.onrender.com/worker/attendance_history`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}
export async function getAttendanceRecord(
  access: string
): Promise<AttendanceRecord> {
  const response = await fetch(
    `https://signmein-api.onrender.com/attendance_record`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    }
  );
  if (!response.ok) throw new Error("Failed to complete the request");

  return await response.json();
}

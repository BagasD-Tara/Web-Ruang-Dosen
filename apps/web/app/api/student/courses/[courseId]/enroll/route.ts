import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { enrollInCourse } from '@/lib/api/courseApi';
import { ApiRequestError } from '@/lib/api/httpClient';

export async function POST(
  _request: Request,
  context: { params: Promise<{ courseId: string }> }
) {
  try {
    const { courseId } = await context.params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: 'Sesi login tidak ditemukan. Silakan login ulang.' },
        { status: 401 }
      );
    }

    await enrollInCourse(courseId, accessToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ApiRequestError) {
      if (error.status === 409) {
        return NextResponse.json({ success: true, alreadyEnrolled: true });
      }

      return NextResponse.json(
        { success: false, message: error.message },
        { status: error.status || 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Failed to enroll in course.' },
      { status: 500 }
    );
  }
}

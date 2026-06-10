import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { LecturerModuleEditorView } from '@/components/lecturer/LecturerModuleEditorView';
import { getLecturerManageCourse } from '@/lib/api/courseRepository';
import { createLecturerModule } from '@/lib/mock/lecturerCourseManagement';

interface LecturerCreateModulePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function LecturerCreateModulePage({
  params,
}: LecturerCreateModulePageProps) {
  const { courseId } = await params;
  const courseData = await getLecturerManageCourse(courseId);

  if (!courseData) {
    notFound();
  }

  async function handleSave(data: any) {
    'use server';

    createLecturerModule(courseId, {
      title: data.title,
      description: data.description,
      sequence: data.sequence,
      durationWeeks: data.durationWeeks,
      visibilityStatus: data.visibilityStatus,
    });

    revalidatePath(`/dosen/courses/${courseId}`);
    redirect(`/dosen/courses/${courseId}`);
  }

  return (
    <LecturerModuleEditorView
      mode="create"
      course={courseData.course}
      termLabel={courseData.termLabel}
      moduleCount={courseData.modules.length}
      onSave={handleSave}
    />
  );
}

import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { LecturerModuleEditorView } from '@/components/lecturer/LecturerModuleEditorView';
import { getLecturerModule } from '@/lib/api/courseRepository';
import { updateLecturerModule, deleteLecturerModule } from '@/lib/mock/lecturerCourseManagement';

interface LecturerEditModulePageProps {
  params: Promise<{ courseId: string; moduleId: string }>;
}

export default async function LecturerEditModulePage({
  params,
}: LecturerEditModulePageProps) {
  const { courseId, moduleId } = await params;
  const moduleData = await getLecturerModule(courseId, moduleId);

  if (!moduleData) {
    notFound();
  }

  async function handleSave(data: any) {
    'use server';

    updateLecturerModule(courseId, moduleId, {
      title: data.title,
      description: data.description,
      sequence: data.sequence,
      durationWeeks: data.durationWeeks,
      visibilityStatus: data.visibilityStatus,
    });

    revalidatePath(`/dosen/courses/${courseId}`);
    redirect(`/dosen/courses/${courseId}`);
  }

  async function handleDelete() {
    'use server';

    deleteLecturerModule(courseId, moduleId);

    revalidatePath(`/dosen/courses/${courseId}`);
    redirect(`/dosen/courses/${courseId}`);
  }

  return (
    <LecturerModuleEditorView
      mode="edit"
      course={moduleData.course}
      termLabel={moduleData.termLabel}
      module={moduleData.module}
      moduleCount={moduleData.moduleCount}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}

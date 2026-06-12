import { notFound, redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { LecturerMaterialEditorView } from '@/components/lecturer/LecturerMaterialEditorView';
import { getLecturerMaterial } from '@/lib/api/courseRepository';
import { updateMaterialApi, deleteMaterialApi, uploadFileApi, type ApiMaterialType } from '@/lib/api/courseApi';


interface LecturerEditMaterialPageProps {
  params: Promise<{ courseId: string; moduleId: string; materialId: string }>;
}

export default async function LecturerEditMaterialPage({
  params,
}: LecturerEditMaterialPageProps) {
  const { courseId, moduleId, materialId } = await params;
  const materialData = await getLecturerMaterial(courseId, moduleId, materialId);

  if (!materialData) {
    notFound();
  }

  async function handleSave(formData: FormData) {
    'use server';

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const materialKind = formData.get('materialKind') as string;
    const visibilityStatus = formData.get('visibilityStatus') as string;
    const externalUrl = formData.get('externalUrl') as string;
    const videoSourceMode = formData.get('videoSourceMode') as string;
    const file = formData.get('file') as File | null;

    let fileUrl = '';
    let fileName = '';
    let fileMeta = '';

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (file && file.size > 0 && token) {
      try {
        const uploadResult = await uploadFileApi(file, token);
        fileUrl = uploadResult.url;
        fileName = uploadResult.fileName;
        fileMeta = `${(uploadResult.size / (1024 * 1024)).toFixed(2)} MB`;
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }

    let apiType: ApiMaterialType = 'TEXT';
    let resolvedUrl = externalUrl;

    if (materialKind === 'video') {
      apiType = 'VIDEO';
      resolvedUrl = videoSourceMode === 'link' ? externalUrl : (fileUrl || materialData!.material.fileName || '');
    } else if (materialKind === 'document') {
      apiType = 'DOCUMENT';
      resolvedUrl = fileUrl || materialData!.material.fileName || '';
    } else {
      apiType = 'TEXT';
      resolvedUrl = externalUrl;
    }

    if (token) {
      try {
        await updateMaterialApi(
          materialId,
          {
            title,
            type: apiType,
            content: description,
            url: resolvedUrl,
          },
          token
        );
      } catch (error) {
        console.error('Failed to update material via API:', error);
      }
    }

    revalidatePath(`/dosen/courses/${courseId}`);
    redirect(`/dosen/courses/${courseId}`);
  }

  async function handleDelete() {
    'use server';

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
      try {
        await deleteMaterialApi(materialId, token);
      } catch (error) {
        console.error('Failed to delete material via API:', error);
      }
    }

    revalidatePath(`/dosen/courses/${courseId}`);
    redirect(`/dosen/courses/${courseId}`);
  }

  return (
    <LecturerMaterialEditorView
      mode="edit"
      course={materialData.course}
      module={materialData.module}
      material={materialData.material}
      onSave={handleSave}
      onDelete={handleDelete}
    />
  );
}

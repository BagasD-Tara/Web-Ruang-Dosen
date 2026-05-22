import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { PrismaService } from '../../prisma/prisma.service';
import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';

describe('CoursesService', () => {
  let service: CoursesService;
  let prisma: PrismaService;

  const mockPrismaService = {
    course: {
      findUnique: jest.fn(),
    },
    material: {
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    enrollment: {
      findMany: jest.fn(),
    },
    user: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<CoursesService>(CoursesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createMaterial', () => {
    const validCourse = {
      id: 'course-123',
      title: 'Pemrograman Web',
      instructorId: 'lecturer-1',
      instructor: {
        id: 'lecturer-1',
        role: 'LECTURER',
      },
    };

    it('should create a TEXT material successfully', async () => {
      const dto = {
        title: 'Materi HTML',
        type: 'TEXT',
        content: 'Belajar HTML Dasar',
        courseId: 'course-123',
      };

      mockPrismaService.course.findUnique.mockResolvedValue(validCourse);
      mockPrismaService.material.create.mockResolvedValue({
        id: 'mat-1',
        ...dto,
        url: null,
      });

      const result = await service.createMaterial(dto, 'lecturer-1');

      expect(prisma.course.findUnique).toHaveBeenCalledWith({
        where: { id: dto.courseId },
        include: { instructor: true },
      });
      expect(prisma.material.create).toHaveBeenCalledWith({
        data: {
          title: dto.title,
          type: 'TEXT',
          courseId: dto.courseId,
          content: dto.content,
          url: null,
        },
      });
      expect(result).toBeDefined();
    });

    it('should create a VIDEO material successfully mapping content to url', async () => {
      const dto = {
        title: 'Video CSS',
        type: 'VIDEO',
        content: 'https://youtube.com/watch?v=css',
        courseId: 'course-123',
      };

      mockPrismaService.course.findUnique.mockResolvedValue(validCourse);
      mockPrismaService.material.create.mockResolvedValue({
        id: 'mat-2',
        title: dto.title,
        type: 'VIDEO',
        courseId: dto.courseId,
        url: dto.content,
        content: null,
      });

      const result = await service.createMaterial(dto, 'lecturer-1');

      expect(prisma.material.create).toHaveBeenCalledWith({
        data: {
          title: dto.title,
          type: 'VIDEO',
          courseId: dto.courseId,
          content: null,
          url: dto.content,
        },
      });
      expect(result.url).toBe(dto.content);
    });

    it('should throw BadRequestException if required fields are missing', async () => {
      await expect(service.createMaterial({ type: 'TEXT', content: 'test', courseId: '1' }, 'u1'))
        .rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if course does not exist', async () => {
      mockPrismaService.course.findUnique.mockResolvedValue(null);

      await expect(service.createMaterial({ title: 'T', type: 'TEXT', content: 'C', courseId: 'non-existent' }, 'u1'))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not the instructor of the course', async () => {
      mockPrismaService.course.findUnique.mockResolvedValue(validCourse);

      await expect(service.createMaterial({ title: 'T', type: 'TEXT', content: 'C', courseId: 'course-123' }, 'other-user'))
        .rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if instructor is not a LECTURER', async () => {
      const studentCourse = {
        ...validCourse,
        instructor: { id: 'lecturer-1', role: 'STUDENT' },
      };
      mockPrismaService.course.findUnique.mockResolvedValue(studentCourse);

      await expect(service.createMaterial({ title: 'T', type: 'TEXT', content: 'C', courseId: 'course-123' }, 'lecturer-1'))
        .rejects.toThrow(ForbiddenException);
    });
  });

  describe('findMaterialOne', () => {
    it('should retrieve a TEXT material and map content to content and konten', async () => {
      const mockMaterial = {
        id: 'mat-100',
        title: 'HTML Introduction',
        type: 'TEXT',
        content: 'This is HTML text.',
        url: null,
        courseId: 'course-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.material.findUnique.mockResolvedValue(mockMaterial);

      const result = await service.findMaterialOne('mat-100');

      expect(prisma.material.findUnique).toHaveBeenCalledWith({
        where: { id: 'mat-100' },
      });
      expect(result.judul).toBe(mockMaterial.title);
      expect(result.title).toBe(mockMaterial.title);
      expect(result.tipe).toBe(mockMaterial.type);
      expect(result.type).toBe(mockMaterial.type);
      expect(result.content).toBe(mockMaterial.content);
      expect(result.konten).toBe(mockMaterial.content);
    });

    it('should retrieve a VIDEO material and map url to content and konten', async () => {
      const mockMaterial = {
        id: 'mat-200',
        title: 'CSS Tutorial Video',
        type: 'VIDEO',
        content: null,
        url: 'https://youtube.com/watch?v=css-tutorial',
        courseId: 'course-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.material.findUnique.mockResolvedValue(mockMaterial);

      const result = await service.findMaterialOne('mat-200');

      expect(result.content).toBe(mockMaterial.url);
      expect(result.konten).toBe(mockMaterial.url);
    });

    it('should retrieve a DOCUMENT material and map url to content and konten', async () => {
      const mockMaterial = {
        id: 'mat-300',
        title: 'Syllabus PDF',
        type: 'DOCUMENT',
        content: null,
        url: '/files/syllabus.pdf',
        courseId: 'course-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockPrismaService.material.findUnique.mockResolvedValue(mockMaterial);

      const result = await service.findMaterialOne('mat-300');

      expect(result.content).toBe(mockMaterial.url);
      expect(result.konten).toBe(mockMaterial.url);
    });

    it('should throw NotFoundException if material is not found', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(null);

      await expect(service.findMaterialOne('non-existent-material'))
        .rejects.toThrow(NotFoundException);
    });
  });

  describe('updateMaterial', () => {
    const existingTextMaterial = {
      id: 'mat-edit-1',
      title: 'Original Title',
      type: 'TEXT',
      content: 'Original content.',
      url: null,
      courseId: 'course-123',
      course: {
        id: 'course-123',
        instructorId: 'lecturer-1',
        instructor: {
          id: 'lecturer-1',
          role: 'LECTURER',
        },
      },
    };

    it('should update the title of a material successfully', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(existingTextMaterial);
      mockPrismaService.material.update.mockResolvedValue({
        ...existingTextMaterial,
        title: 'New Title',
      });

      const result = await service.updateMaterial('mat-edit-1', { title: 'New Title' }, 'lecturer-1');

      expect(prisma.material.update).toHaveBeenCalledWith({
        where: { id: 'mat-edit-1' },
        data: { title: 'New Title' },
      });
      expect(result.title).toBe('New Title');
      expect(result.judul).toBe('New Title');
    });

    it('should update the type from TEXT to VIDEO and map existing content to url', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(existingTextMaterial);
      mockPrismaService.material.update.mockResolvedValue({
        ...existingTextMaterial,
        type: 'VIDEO',
        content: null,
        url: 'Original content.',
      });

      const result = await service.updateMaterial('mat-edit-1', { type: 'VIDEO' }, 'lecturer-1');

      expect(prisma.material.update).toHaveBeenCalledWith({
        where: { id: 'mat-edit-1' },
        data: {
          type: 'VIDEO',
          content: null,
          url: 'Original content.',
        },
      });
      expect(result.type).toBe('VIDEO');
      expect(result.content).toBe('Original content.');
    });

    it('should throw NotFoundException if material is not found', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(null);

      await expect(service.updateMaterial('non-existent', { title: 'New' }, 'lecturer-1'))
        .rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if user is not the instructor', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(existingTextMaterial);

      await expect(service.updateMaterial('mat-edit-1', { title: 'New' }, 'other-user'))
        .rejects.toThrow(ForbiddenException);
    });

    it('should throw BadRequestException if invalid type is provided', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(existingTextMaterial);

      await expect(service.updateMaterial('mat-edit-1', { type: 'INVALID' }, 'lecturer-1'))
        .rejects.toThrow(BadRequestException);
    });
  });

  describe('findMyCourses', () => {
    it('should retrieve enrolled courses successfully', async () => {
      const mockEnrollments = [
        {
          id: 'enroll-1',
          userId: 'student-1',
          courseId: 'course-1',
          course: {
            id: 'course-1',
            title: 'Course 1',
            instructorId: 'lecturer-1',
            instructor: {
              id: 'lecturer-1',
              name: 'Lecturer One',
              email: 'lec1@example.com',
              role: 'LECTURER',
              xp: 100,
            },
            _count: { enrollments: 1 },
          },
        },
      ];

      mockPrismaService.enrollment.findMany.mockResolvedValue(mockEnrollments);

      const result = await service.findMyCourses('student-1');

      expect(prisma.enrollment.findMany).toHaveBeenCalledWith({
        where: { userId: 'student-1' },
        include: {
          course: {
            include: {
              instructor: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  role: true,
                  xp: true,
                },
              },
              _count: {
                select: { enrollments: true },
              },
            },
          },
        },
      });

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('course-1');
      expect(result[0].title).toBe('Course 1');
    });

    it('should throw ForbiddenException if userId is not provided', async () => {
      await expect(service.findMyCourses('')).rejects.toThrow(ForbiddenException);
    });
  });

  describe('removeMaterial', () => {
    const mockMaterial = {
      id: 'mat-1',
      title: 'Material 1',
      type: 'TEXT',
      courseId: 'course-1',
      course: {
        id: 'course-1',
        instructorId: 'lecturer-1',
        instructor: {
          id: 'lecturer-1',
          role: 'LECTURER',
        },
      },
    };

    it('should delete material successfully when user is the course owner lecturer', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(mockMaterial);
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 'lecturer-1', role: 'LECTURER' });
      mockPrismaService.material.delete.mockResolvedValue(mockMaterial);

      const result = await service.removeMaterial('mat-1', 'lecturer-1');

      expect(prisma.material.delete).toHaveBeenCalledWith({ where: { id: 'mat-1' } });
      expect(result).toEqual({
        success: true,
        message: 'Material successfully deleted',
        pesan: 'Materi berhasil dihapus',
      });
    });

    it('should delete material successfully when user is an admin', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(mockMaterial);
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 'admin-1', role: 'ADMIN' });
      mockPrismaService.material.delete.mockResolvedValue(mockMaterial);

      const result = await service.removeMaterial('mat-1', 'admin-1');

      expect(prisma.material.delete).toHaveBeenCalledWith({ where: { id: 'mat-1' } });
      expect(result.success).toBe(true);
    });

    it('should throw ForbiddenException when user is neither the owner lecturer nor admin', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(mockMaterial);
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 'student-1', role: 'STUDENT' });

      await expect(service.removeMaterial('mat-1', 'student-1')).rejects.toThrow(ForbiddenException);
    });

    it('should throw NotFoundException if material is not found', async () => {
      mockPrismaService.material.findUnique.mockResolvedValue(null);

      await expect(service.removeMaterial('non-existent', 'lecturer-1')).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if userId is not provided', async () => {
      await expect(service.removeMaterial('mat-1', '')).rejects.toThrow(ForbiddenException);
    });
  });
});

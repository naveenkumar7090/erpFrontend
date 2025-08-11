import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import demoService from "../../services/demoService";

// Async thunks for Classes
export const fetchClasses = createAsyncThunk(
  "school/fetchClasses",
  async (params = {}, { rejectWithValue, getState }) => {
    try {
      // Check if in demo mode
      const state = getState();
      if (state.auth.isDemoMode) {
        return await demoService.getDemoClasses();
      }

      // Regular API call
      const response = await api.get("/school/classes", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch classes"
      );
    }
  }
);

export const createClass = createAsyncThunk(
  "school/createClass",
  async (classData, { rejectWithValue }) => {
    try {
      const response = await api.post("/school/classes", classData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create class"
      );
    }
  }
);

export const updateClass = createAsyncThunk(
  "school/updateClass",
  async ({ id, classData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/school/classes/${id}`, classData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update class"
      );
    }
  }
);

export const deleteClass = createAsyncThunk(
  "school/deleteClass",
  async (classId, { rejectWithValue }) => {
    try {
      await api.delete(`/school/classes/${classId}`);
      return classId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete class"
      );
    }
  }
);

// Async thunks for Sections
export const fetchSections = createAsyncThunk(
  "school/fetchSections",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/school/sections", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch sections"
      );
    }
  }
);

export const createSection = createAsyncThunk(
  "school/createSection",
  async (sectionData, { rejectWithValue }) => {
    try {
      const response = await api.post("/school/sections", sectionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create section"
      );
    }
  }
);

export const updateSection = createAsyncThunk(
  "school/updateSection",
  async ({ id, sectionData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/school/sections/${id}`, sectionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update section"
      );
    }
  }
);

export const deleteSection = createAsyncThunk(
  "school/deleteSection",
  async (sectionId, { rejectWithValue }) => {
    try {
      await api.delete(`/school/sections/${sectionId}`);
      return sectionId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete section"
      );
    }
  }
);

// Async thunks for Subjects
export const fetchSubjects = createAsyncThunk(
  "school/fetchSubjects",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/school/subjects", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subjects"
      );
    }
  }
);

export const createSubject = createAsyncThunk(
  "school/createSubject",
  async (subjectData, { rejectWithValue }) => {
    try {
      const response = await api.post("/school/subjects", subjectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create subject"
      );
    }
  }
);

export const updateSubject = createAsyncThunk(
  "school/updateSubject",
  async ({ id, subjectData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/school/subjects/${id}`, subjectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update subject"
      );
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "school/deleteSubject",
  async (subjectId, { rejectWithValue }) => {
    try {
      await api.delete(`/school/subjects/${subjectId}`);
      return subjectId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete subject"
      );
    }
  }
);

// Async thunks for Classrooms
export const fetchClassrooms = createAsyncThunk(
  "school/fetchClassrooms",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/school/classrooms", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch classrooms"
      );
    }
  }
);

export const createClassroom = createAsyncThunk(
  "school/createClassroom",
  async (classroomData, { rejectWithValue }) => {
    try {
      const response = await api.post("/school/classrooms", classroomData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create classroom"
      );
    }
  }
);

export const updateClassroom = createAsyncThunk(
  "school/updateClassroom",
  async ({ id, classroomData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/school/classrooms/${id}`, classroomData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update classroom"
      );
    }
  }
);

export const deleteClassroom = createAsyncThunk(
  "school/deleteClassroom",
  async (classroomId, { rejectWithValue }) => {
    try {
      await api.delete(`/school/classrooms/${classroomId}`);
      return classroomId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete classroom"
      );
    }
  }
);

// Async thunks for Campuses
export const fetchCampuses = createAsyncThunk(
  "school/fetchCampuses",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/school/campuses", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch campuses"
      );
    }
  }
);

export const createCampus = createAsyncThunk(
  "school/createCampus",
  async (campusData, { rejectWithValue }) => {
    try {
      const response = await api.post("/school/campuses", campusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create campus"
      );
    }
  }
);

export const updateCampus = createAsyncThunk(
  "school/updateCampus",
  async ({ id, campusData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/school/campuses/${id}`, campusData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update campus"
      );
    }
  }
);

export const deleteCampus = createAsyncThunk(
  "school/deleteCampus",
  async (campusId, { rejectWithValue }) => {
    try {
      await api.delete(`/school/campuses/${campusId}`);
      return campusId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete campus"
      );
    }
  }
);

// Async thunks for Timetable
export const fetchTimetable = createAsyncThunk(
  "school/fetchTimetable",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get("/school/timetable", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch timetable"
      );
    }
  }
);

export const updateTimetable = createAsyncThunk(
  "school/updateTimetable",
  async (timetableData, { rejectWithValue }) => {
    try {
      const response = await api.put("/school/timetable", timetableData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update timetable"
      );
    }
  }
);

const initialState = {
  // Classes
  classes: [],
  classesLoading: false,
  classesError: null,

  // Sections
  sections: [],
  sectionsLoading: false,
  sectionsError: null,

  // Subjects
  subjects: [],
  subjectsLoading: false,
  subjectsError: null,

  // Classrooms
  classrooms: [],
  classroomsLoading: false,
  classroomsError: null,

  // Campuses
  campuses: [],
  campusesLoading: false,
  campusesError: null,

  // Timetable
  timetable: null,
  timetableLoading: false,
  timetableError: null,

  // General
  isLoading: false,
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  filters: {
    class: "",
    section: "",
    subject: "",
    campus: "",
    search: "",
  },
};

const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.classesError = null;
      state.sectionsError = null;
      state.subjectsError = null;
      state.classroomsError = null;
      state.campusesError = null;
      state.timetableError = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = initialState.pagination;
    },
    updateTimetableLocally: (state, action) => {
      if (state.timetable) {
        state.timetable = { ...state.timetable, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Classes
      .addCase(fetchClasses.pending, (state) => {
        state.classesLoading = true;
        state.classesError = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.classesLoading = false;
        state.classes = action.payload.classes;
        state.pagination = action.payload.pagination;
        state.classesError = null;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.classesLoading = false;
        state.classesError = action.payload;
      })
      .addCase(createClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes.unshift(action.payload);
        state.error = null;
      })
      .addCase(createClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClass.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.classes.findIndex(
          (cls) => cls.id === action.payload.id
        );
        if (index !== -1) {
          state.classes[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteClass.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classes = state.classes.filter(
          (cls) => cls.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteClass.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Sections
      .addCase(fetchSections.pending, (state) => {
        state.sectionsLoading = true;
        state.sectionsError = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.sectionsLoading = false;
        state.sections = action.payload.sections;
        state.sectionsError = null;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.sectionsLoading = false;
        state.sectionsError = action.payload;
      })
      .addCase(createSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections.unshift(action.payload);
        state.error = null;
      })
      .addCase(createSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.sections.findIndex(
          (sec) => sec.id === action.payload.id
        );
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSection.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = state.sections.filter(
          (sec) => sec.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteSection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.subjectsLoading = true;
        state.subjectsError = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.subjectsLoading = false;
        state.subjects = action.payload.subjects;
        state.subjectsError = null;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.subjectsLoading = false;
        state.subjectsError = action.payload;
      })
      .addCase(createSubject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects.unshift(action.payload);
        state.error = null;
      })
      .addCase(createSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateSubject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.subjects.findIndex(
          (sub) => sub.id === action.payload.id
        );
        if (index !== -1) {
          state.subjects[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteSubject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.subjects = state.subjects.filter(
          (sub) => sub.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteSubject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Classrooms
      .addCase(fetchClassrooms.pending, (state) => {
        state.classroomsLoading = true;
        state.classroomsError = null;
      })
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.classroomsLoading = false;
        state.classrooms = action.payload.classrooms;
        state.classroomsError = null;
      })
      .addCase(fetchClassrooms.rejected, (state, action) => {
        state.classroomsLoading = false;
        state.classroomsError = action.payload;
      })
      .addCase(createClassroom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classrooms.unshift(action.payload);
        state.error = null;
      })
      .addCase(createClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateClassroom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.classrooms.findIndex(
          (room) => room.id === action.payload.id
        );
        if (index !== -1) {
          state.classrooms[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteClassroom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteClassroom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.classrooms = state.classrooms.filter(
          (room) => room.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteClassroom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Campuses
      .addCase(fetchCampuses.pending, (state) => {
        state.campusesLoading = true;
        state.campusesError = null;
      })
      .addCase(fetchCampuses.fulfilled, (state, action) => {
        state.campusesLoading = false;
        state.campuses = action.payload.campuses;
        state.campusesError = null;
      })
      .addCase(fetchCampuses.rejected, (state, action) => {
        state.campusesLoading = false;
        state.campusesError = action.payload;
      })
      .addCase(createCampus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campuses.unshift(action.payload);
        state.error = null;
      })
      .addCase(createCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCampus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.campuses.findIndex(
          (campus) => campus.id === action.payload.id
        );
        if (index !== -1) {
          state.campuses[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCampus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCampus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campuses = state.campuses.filter(
          (campus) => campus.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteCampus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Timetable
      .addCase(fetchTimetable.pending, (state) => {
        state.timetableLoading = true;
        state.timetableError = null;
      })
      .addCase(fetchTimetable.fulfilled, (state, action) => {
        state.timetableLoading = false;
        state.timetable = action.payload;
        state.timetableError = null;
      })
      .addCase(fetchTimetable.rejected, (state, action) => {
        state.timetableLoading = false;
        state.timetableError = action.payload;
      })
      .addCase(updateTimetable.pending, (state) => {
        state.timetableLoading = true;
        state.timetableError = null;
      })
      .addCase(updateTimetable.fulfilled, (state, action) => {
        state.timetableLoading = false;
        state.timetable = action.payload;
        state.timetableError = null;
      })
      .addCase(updateTimetable.rejected, (state, action) => {
        state.timetableLoading = false;
        state.timetableError = action.payload;
      });
  },
});

export const {
  clearError,
  setFilters,
  setPagination,
  resetFilters,
  updateTimetableLocally,
} = schoolSlice.actions;

export default schoolSlice.reducer;

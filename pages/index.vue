<script setup lang="ts">
import { supabase } from '@/lib/supabase'
import { uploadFileToSupabase } from '@/utils/supabaseImage'

const images = ref()
const file = ref<File | null>(null)
const previewUrl = ref<string | null>(null) // เพิ่มตัวแปรสำหรับแสดงตัวอย่างภาพ
const isLoading = ref(false)

const onFileChange = (event: any) => {
  const files = event[0];
  if (files && files) {
    file.value = files
    previewUrl.value = URL.createObjectURL(files) // สร้าง URL ตัวอย่างภาพ
    console.log(files)
  }
}

onMounted(async () => {
  const { data } = await supabase.from('imgesuploda').select()
  console.log(data)
  if (data) {
    images.value = data;
  }
})

async function onSubmit() {
  if (!file.value || isLoading.value) return
  isLoading.value = true
  try {
    const url = await uploadFileToSupabase(file.value, "Test")
    const { error } = await supabase
      .from('imgesuploda')
      .insert([
        {
            url: url,date_image: file.value.lastModifiedDate
        },
      ])

    if (error) {
      console.error(error.message)
    } else {
      console.log('Uploaded URL:', url)
      previewUrl.value = null
      images.value.push({url: url})
      alert('Upload successful!')
    }
  } catch (error) {
    console.error('Upload failed:', error)
    alert('Upload failed!')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <UContainer class="mt-32">
    <div class="flex justify-center">
      <UCard class="w-96">
        <div class="space-y-4">
          <UInput type="file" size="sm" accept="image/*" @change="onFileChange" icon="i-heroicons-folder" />
          <UButton :loading="isLoading" @click="onSubmit" type="submit">
            Submit
          </UButton>
        </div>
      </UCard>
    </div>
    <div class="flex justify-center">
      <!-- แสดงตัวอย่างภาพ -->
      <div v-if="previewUrl" class="mt-3 w-96">
        <p>ตัวอย่างรูปภาพ:</p>
        <img :src="previewUrl" alt="Preview" class="w-96 object-cover rounded-md border" />
      </div>
    </div>
    <ul class="flex flex-col justify-center items-center space-y-4 mt-8">
      <p>List:</p>
      <li v-for="img in images" :key="img.id" class="w-96 text-center">
        <img :src="`https://mtfinjbgtxivhfncbccm.supabase.co/storage/v1/object/public/Test/${img.url}`" class="w-96 object-cover rounded-md border" alt="img.url">
        <p>{{ img.date_image }}</p>
      </li>
    </ul>
  </UContainer>
</template>
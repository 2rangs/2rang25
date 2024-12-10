<template>
  <ClientOnly>
    <MainLayout>
      <div class="min-h-screen p-8 flex flex-col items-center space-y-8">
        <h1 class="text-4xl font-bold">웹에서 ai모델 돌리기</h1>

        <!-- 이미지 파일 업로드 및 주소 입력 -->
        <div class="w-full max-w-md flex flex-col items-center space-y-6">
          <!-- 파일 업로드 섹션 -->
          <div class="flex items-center space-x-4 w-full">
            <input
                ref="fileInput"
                type="file"
                multiple
                @change="handleFileChange"
                class="flex-1 text-sm border dark:border-gray-400 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                accept="image/*"
            />
            <button
                @click="resetImages"
                :disabled="images.length === 0"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 disabled:opacity-80 transition dark:bg-red-700 dark:hover:bg-red-600"
            >
              Reset Images
            </button>
          </div>

          <!-- URL 입력 섹션 -->
          <div class="flex items-center space-x-4 w-full">
            <input
                v-model="imageUrl"
                type="text"
                placeholder="Enter image URL"
                class="flex-1 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-600 dark:border-gray-400"
            />
            <button
                @click="addImageFromUrl"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Add Image
            </button>
          </div>
        </div>


        <!-- 탐지 진행 중 상태 표시 -->
        <div v-if="isLoading" class="text-yellow-400 font-semibold">Processing images, please wait...</div>

        <!-- 탐지 결과 -->
        <div v-if="images.length > 0" class="space-y-8 w-full max-w-6xl">
          <div
              v-for="(image, index) in images"
              :key="index"
              class="glassmorphism-card p-6 space-y-4"
          >
            <div class="flex items-start space-x-4">
              <!-- 원본 이미지 -->
              <div class="flex-1">
                <h3 class="text-center mb-2">Original Image</h3>
                <img
                    :src="image.src"
                    alt="Original Image"
                    class="max-w-full max-h-[400px] object-contain rounded-md shadow-md"
                />
              </div>

              <!-- 라벨링된 이미지 -->
              <div class="flex-1">
                <h3 class="text-center mb-2">Labeled Image</h3>
                <canvas :id="'canvas-labeled-' + index" class="max-w-full max-h-[400px] rounded-md shadow-md"></canvas>
              </div>

              <!-- 블러된 이미지 -->
              <div class="flex-1">
                <h3 class="text-center mb-2">Blurred Image</h3>
                <canvas :id="'canvas-blurred-' + index" class="max-w-full max-h-[400px] rounded-md shadow-md"></canvas>
              </div>
            </div>
            <div v-if="image.predictions.length > 0" class="mt-4 text-gray-900 dark:text-gray-200">
              <h3 class="text-lg font-semibold mb-2">Detection Information</h3>
              <ul class="space-y-2">
                <li
                    v-for="(prediction, predIndex) in image.predictions"
                    :key="predIndex"
                    class="bg-gray-100 dark:bg-gray-800 rounded-md p-3 text-center text-xl"
                >
                  <span class="font-bold">
                    {{ prediction.class }}
                  </span>
                  :
                  <span class="font-medium text-green-600 dark:text-green-400">
                  {{ (prediction.score * 100).toFixed(2) }}%
                 </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted } from "vue";
import "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import MainLayout from "~/layouts/MainLayout.vue";

const fileInput = ref(null);
const images = ref([]);
const imageUrl = ref("");
const isLoading = ref(false);
let cocoModel = null;
let temp
onMounted(async () => {
  isLoading.value = true;
  cocoModel = await cocoSsd.load();
  console.log("COCO-SSD model loaded");
  isLoading.value = false;
});

const handleFileChange = async (event) => {
  const files = event.target.files;
  images.value = Array.from(files).map((file) => ({
    file,
    src: URL.createObjectURL(file),
    predictions: [],
  }));

  processImages();
};

const addImageFromUrl = () => {
  if (imageUrl.value.trim()) {
    const proxiedUrl = `/api/proxy?url=${encodeURIComponent(imageUrl.value.trim())}`;
    images.value.push({ src: proxiedUrl, predictions: [] });
    imageUrl.value = "";
    processImages();
  }
};

const processImages = async () => {
  isLoading.value = true;

  for (let i = 0; i < images.value.length; i++) {
    const imageElement = new Image();
    imageElement.src = images.value[i].src;

    imageElement.onload = async () => {
      const predictions = await cocoModel.detect(imageElement);
      temp = predictions
      console.log(`Predictions for image ${i + 1}:`, predictions);

      images.value[i].predictions = predictions;
      drawLabeledImage(i, predictions, imageElement);
      drawBlurredImage(i, predictions, imageElement);

      if (i === images.value.length - 1) {
        isLoading.value = false;
      }
    };
  }
};

const drawLabeledImage = (index, predictions, imageElement) => {
  const canvas = document.getElementById(`canvas-labeled-${index}`);
  const ctx = canvas.getContext("2d");

  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

  predictions.forEach((prediction) => {
    const [x, y, w, h] = prediction.bbox;

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = "rgba(255, 255, 0, 0.8)";
    ctx.fillRect(x, y - 20, ctx.measureText(prediction.class).width + 70, 20);

    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.fillText(
        `${prediction.class} (${(prediction.score * 100).toFixed(1)}%)`,
        x + 5,
        y - 5
    );
  });
};

const drawBlurredImage = (index, predictions, imageElement) => {
  const canvas = document.getElementById(`canvas-blurred-${index}`);
  const ctx = canvas.getContext("2d");

  canvas.width = imageElement.width;
  canvas.height = imageElement.height;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

  predictions.forEach((prediction) => {
    const [x, y, w, h] = prediction.bbox;

    ctx.filter = "blur(15px)";
    ctx.drawImage(imageElement, x, y, w, h, x, y, w, h);
  });
};

const resetImages = () => {
  images.value = [];
  fileInput.value.value = "";
};
</script>

<style>
.glassmorphism-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
}


button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: scale(1.05);
}
</style>

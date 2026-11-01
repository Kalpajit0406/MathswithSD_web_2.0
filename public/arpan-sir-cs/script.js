/**
 * ============================================================
 * ARPAN SIR COMPUTER SCIENCE - INTERACTIVE ENGINE
 * Features:
 * 1. Sticky Nav & Mobile Drawer
 * 2. Active Nav Link Highlighting
 * 3. Scroll Fade-in (IntersectionObserver)
 * 4. Animated Statistics Counters
 * 5. Interactive DSA Visual Lab (6 Fully Working Modules)
 *    - Arrays (Indexed access, Insert, Delete, Search)
 *    - Linked Lists (Step-by-step traversal, Append, Delete)
 *    - Stacks (Push, Pop, Peek, LIFO explanation)
 *    - Queues (Enqueue, Dequeue, FIFO explanation)
 *    - Binary Trees (Inorder, Preorder, Postorder traversals)
 *    - Sorting Visualizer (Bubble Sort & Selection Sort)
 * 6. Courses Search & Category Filtering
 * 7. Live Coding Playground (HTML/CSS/JS Sandbox with iframe)
 * 8. Hero Miniature Typing Code Editor
 * 9. Accessible FAQ Accordion
 * 10. Contact Form & Free Demo Modal Validation
 * 11. Toast Notifications & Dynamic Year
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------
     1. STICKY NAVBAR & MOBILE MENU TOGGLE
     ------------------------------------------------------------ */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }
  });

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = hamburgerBtn.classList.toggle('is-active');
      mobileDrawer.classList.toggle('is-open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileDrawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('is-active');
        mobileDrawer.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      });
    });

    document.addEventListener('click', (e) => {
      if (header && !header.contains(e.target) && mobileDrawer.classList.contains('is-open')) {
        hamburgerBtn.classList.remove('is-active');
        mobileDrawer.classList.remove('is-open');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        mobileDrawer.setAttribute('aria-hidden', 'true');
      }
    });
  }


  /* ------------------------------------------------------------
     2. ACTIVE NAV LINK HIGHLIGHT ON SCROLL
     ------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', highlightNavOnScroll);


  /* ------------------------------------------------------------
     3. INTERSECTION OBSERVER FOR SCROLL FADE-IN & AMBIENT DRIFT
     ------------------------------------------------------------ */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeElements = document.querySelectorAll('.fade-in-element');
  if ('IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (!prefersReducedMotion && el.parentElement) {
            const siblings = Array.from(el.parentElement.children).filter(c => c.classList.contains('fade-in-element'));
            const sIdx = siblings.indexOf(el);
            if (sIdx > 0 && sIdx < 8) {
              el.style.transitionDelay = `${sIdx * 0.06}s`;
            }
          }
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    fadeElements.forEach(el => el.classList.add('is-visible'));
  }

  // Gentle scroll drift for hero ambient code layer (restrained & non-overlapping)
  const heroCodeLayer = document.querySelector('.hero-code-layer');
  if (heroCodeLayer && !prefersReducedMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.pageYOffset || window.scrollY;
          if (scrollY < 800) {
            heroCodeLayer.style.transform = `translateY(${scrollY * 0.08}px)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }


  /* ------------------------------------------------------------
     4. ANIMATED STATISTICS COUNTERS
     ------------------------------------------------------------ */
  const statCounters = document.querySelectorAll('.stat-counter');
  let hasAnimatedCounters = false;

  function runCounterAnimation() {
    statCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const duration = 1600;
      const frameDuration = 1000 / 60;
      const totalFrames = Math.round(duration / frameDuration);
      let frame = 0;
      const easeOutQuad = (t) => t * (2 - t);

      const timer = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(target * progress);

        if (frame >= totalFrames) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = currentCount.toLocaleString();
        }
      }, frameDuration);
    });
  }

  const statsSection = document.getElementById('stats');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedCounters) {
          hasAnimatedCounters = true;
          runCounterAnimation();
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }


  /* ------------------------------------------------------------
     5. HERO MINIATURE CODE EDITOR TYPING ANIMATION
     ------------------------------------------------------------ */
  const heroTypedLine = document.getElementById('heroTypedLine');
  const heroEditorPlayBtn = document.getElementById('heroEditorPlayBtn');
  const heroEditorOutput = document.getElementById('heroEditorOutput');
  const sampleCode = 'print(greet("Coder"))';
  let isTyping = false;

  function typeHeroCode() {
    if (!heroTypedLine || isTyping) return;
    isTyping = true;
    heroTypedLine.textContent = '';
    if (heroEditorOutput) heroEditorOutput.style.opacity = '0.3';
    let idx = 0;

    const typeInterval = setInterval(() => {
      if (idx < sampleCode.length) {
        heroTypedLine.textContent += sampleCode.charAt(idx);
        idx++;
      } else {
        clearInterval(typeInterval);
        isTyping = false;
        if (heroEditorOutput) {
          heroEditorOutput.style.opacity = '1';
          heroEditorOutput.innerHTML = '<span>⚡</span> <span>Output: "Hello, Coder!"</span>';
        }
      }
    }, 70);
  }

  if (heroEditorPlayBtn) {
    heroEditorPlayBtn.addEventListener('click', typeHeroCode);
  }
  // Initial gentle trigger after 1.2s if editor is present
  if (heroTypedLine) {
    setTimeout(typeHeroCode, 1200);
  }


  /* ------------------------------------------------------------
     6. DATA STRUCTURES & ALGORITHMS — INTERACTIVE VISUAL LAB
     (MAJOR HIGHLIGHT - SECTION 6)
     ------------------------------------------------------------ */
  const labTabs = document.querySelectorAll('.lab-tab-btn');
  const labModules = {
    array: document.getElementById('moduleArray'),
    linkedlist: document.getElementById('moduleLinkedList'),
    stack: document.getElementById('moduleStack'),
    queue: document.getElementById('moduleQueue'),
    tree: document.getElementById('moduleTree'),
    sort: document.getElementById('moduleSort')
  };

  // Tab switching
  labTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetModule = tab.getAttribute('data-tab');
      labTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      Object.keys(labModules).forEach(key => {
        if (labModules[key]) {
          labModules[key].style.display = (key === targetModule) ? 'block' : 'none';
        }
      });
    });
  });

  // --- MODULE A: ARRAYS ---
  let arrayData = [10, 20, 30, 40, 50];
  const arrayContainer = document.getElementById('arrayContainer');
  const arrayExplText = document.getElementById('arrayExplText');
  const arrayIndexInput = document.getElementById('arrayIndexInput');
  const btnAccessArray = document.getElementById('btnAccessArray');
  const btnInsertArray = document.getElementById('btnInsertArray');
  const btnDeleteArray = document.getElementById('btnDeleteArray');
  const btnSearchArray = document.getElementById('btnSearchArray');

  function renderArray() {
    if (!arrayContainer) return;
    arrayContainer.innerHTML = '';
    arrayData.forEach((val, idx) => {
      const cellWrap = document.createElement('div');
      cellWrap.className = 'array-cell-wrapper';
      cellWrap.innerHTML = `
        <div class="array-cell" data-idx="${idx}" data-val="${val}">${val}</div>
        <span class="array-index">idx [${idx}]</span>
      `;
      cellWrap.querySelector('.array-cell').addEventListener('click', () => {
        highlightArrayCell(idx, `Selected element at index [${idx}] has value ${val}. Memory Address: 0x${(1000 + idx*4).toString(16).toUpperCase()} (Contiguous O(1) Access)`);
      });
      arrayContainer.appendChild(cellWrap);
    });
  }

  function highlightArrayCell(idx, message) {
    const cells = arrayContainer.querySelectorAll('.array-cell');
    cells.forEach((cell, i) => {
      cell.classList.toggle('is-highlighted', i === idx);
    });
    if (arrayExplText) arrayExplText.textContent = message;
  }

  btnAccessArray?.addEventListener('click', () => {
    const idx = parseInt(arrayIndexInput.value, 10);
    if (isNaN(idx) || idx < 0 || idx >= arrayData.length) {
      if (arrayExplText) arrayExplText.textContent = `Index ${idx} is Out of Bounds! Valid range: 0 to ${arrayData.length - 1}.`;
      return;
    }
    highlightArrayCell(idx, `Direct Index Access: arr[${idx}] returned ${arrayData[idx]} in O(1) constant time via base pointer.`);
  });

  btnInsertArray?.addEventListener('click', () => {
    if (arrayData.length >= 8) {
      if (arrayExplText) arrayExplText.textContent = 'Maximum demo capacity reached (8 elements).';
      return;
    }
    const newVal = Math.floor(Math.random() * 80) + 10;
    arrayData.push(newVal);
    renderArray();
    highlightArrayCell(arrayData.length - 1, `Inserted value ${newVal} at index [${arrayData.length - 1}] in O(1) amortized time.`);
  });

  btnDeleteArray?.addEventListener('click', () => {
    if (arrayData.length <= 2) {
      if (arrayExplText) arrayExplText.textContent = 'Array minimum size reached for demo.';
      return;
    }
    const wrappers = arrayContainer.querySelectorAll('.array-cell-wrapper');
    const lastWrapper = wrappers[wrappers.length - 1];
    if (lastWrapper) {
      lastWrapper.classList.add('is-removing');
      setTimeout(() => {
        const popped = arrayData.pop();
        renderArray();
        if (arrayExplText) arrayExplText.textContent = `Deleted last element ${popped}. Array resized to ${arrayData.length} elements.`;
      }, 200);
    } else {
      const popped = arrayData.pop();
      renderArray();
      if (arrayExplText) arrayExplText.textContent = `Deleted last element ${popped}. Array resized to ${arrayData.length} elements.`;
    }
  });

  btnSearchArray?.addEventListener('click', () => {
    const targetVal = arrayData[Math.floor(Math.random() * arrayData.length)];
    let step = 0;
    const cells = arrayContainer.querySelectorAll('.array-cell');
    if (arrayExplText) arrayExplText.textContent = `Searching for value ${targetVal} using Linear Search...`;

    const searchInterval = setInterval(() => {
      cells.forEach(c => c.classList.remove('is-active-action', 'is-highlighted'));
      if (step < arrayData.length) {
        cells[step].classList.add('is-active-action');
        if (arrayData[step] === targetVal) {
          cells[step].classList.remove('is-active-action');
          cells[step].classList.add('is-highlighted');
          if (arrayExplText) arrayExplText.textContent = `Found ${targetVal} at index [${step}] after ${step + 1} comparison(s)! O(n) Search completed.`;
          clearInterval(searchInterval);
        }
        step++;
      } else {
        clearInterval(searchInterval);
      }
    }, 450);
  });

  renderArray();


  // --- MODULE B: LINKED LIST ---
  let llData = [10, 20, 30, 40];
  const llContainer = document.getElementById('llContainer');
  const llExplText = document.getElementById('llExplText');
  const btnTraverseLL = document.getElementById('btnTraverseLL');
  const btnAppendLL = document.getElementById('btnAppendLL');
  const btnDeleteLL = document.getElementById('btnDeleteLL');

  function renderLL() {
    if (!llContainer) return;
    llContainer.innerHTML = '';
    llData.forEach((val, idx) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'll-node' + (idx === 0 ? ' is-head' : '');
      nodeEl.setAttribute('data-idx', idx);
      nodeEl.innerHTML = `
        <div class="ll-val">${val}</div>
        <div class="ll-ptr">•</div>
      `;
      llContainer.appendChild(nodeEl);

      const arrow = document.createElement('div');
      arrow.className = 'll-arrow';
      arrow.innerHTML = '➔';
      llContainer.appendChild(arrow);
    });

    const nullEl = document.createElement('div');
    nullEl.className = 'll-null';
    nullEl.textContent = 'NULL';
    llContainer.appendChild(nullEl);
  }

  btnTraverseLL?.addEventListener('click', () => {
    const nodes = llContainer.querySelectorAll('.ll-node');
    const arrows = llContainer.querySelectorAll('.ll-arrow');
    let idx = 0;
    if (llExplText) llExplText.textContent = 'Traversing pointer chain from head node...';

    const travTimer = setInterval(() => {
      nodes.forEach(n => n.classList.remove('is-traversing'));
      arrows.forEach(a => a.classList.remove('is-active-link'));
      if (idx < nodes.length) {
        nodes[idx].classList.add('is-traversing');
        if (idx > 0 && arrows[idx - 1]) {
          arrows[idx - 1].classList.add('is-active-link');
        }
        if (llExplText) llExplText.textContent = `Current pointer at node ${llData[idx]} (Address: 0x${(2040 + idx*16).toString(16)}). Next: ${idx === nodes.length - 1 ? 'NULL' : llData[idx+1]}`;
        idx++;
      } else {
        clearInterval(travTimer);
        setTimeout(() => {
          nodes.forEach(n => n.classList.remove('is-traversing'));
          arrows.forEach(a => a.classList.remove('is-active-link'));
          if (llExplText) llExplText.textContent = 'Reached NULL pointer at tail! Traversal finished in O(n) time.';
        }, 600);
      }
    }, 550);
  });

  btnAppendLL?.addEventListener('click', () => {
    if (llData.length >= 6) {
      if (llExplText) llExplText.textContent = 'Demo list capacity reached (6 nodes).';
      return;
    }
    const newVal = Math.floor(Math.random() * 80) + 10;
    llData.push(newVal);
    renderLL();
    if (llExplText) llExplText.textContent = `Allocated new node ${newVal} on heap. Updated previous tail's .next pointer in O(1) time.`;
  });

  btnDeleteLL?.addEventListener('click', () => {
    if (llData.length <= 2) {
      if (llExplText) llExplText.textContent = 'Minimum demo size reached.';
      return;
    }
    const nodes = llContainer.querySelectorAll('.ll-node');
    const lastNode = nodes[nodes.length - 1];
    if (lastNode) {
      lastNode.classList.add('is-removing');
      setTimeout(() => {
        const removed = llData.pop();
        renderLL();
        if (llExplText) llExplText.textContent = `Deallocated node ${removed}. Tail pointer updated to point to NULL.`;
      }, 200);
    } else {
      const removed = llData.pop();
      renderLL();
      if (llExplText) llExplText.textContent = `Deallocated node ${removed}. Tail pointer updated to point to NULL.`;
    }
  });

  renderLL();


  // --- MODULE C: STACK (LIFO) ---
  let stackData = [10, 20, 30, 40];
  const stackBucket = document.getElementById('stackBucket');
  const stackTopLabel = document.getElementById('stackTopLabel');
  const stackExplText = document.getElementById('stackExplText');
  const btnPushStack = document.getElementById('btnPushStack');
  const btnPopStack = document.getElementById('btnPopStack');
  const btnPeekStack = document.getElementById('btnPeekStack');

  function renderStack() {
    if (!stackBucket) return;
    stackBucket.innerHTML = '';
    stackData.forEach(val => {
      const item = document.createElement('div');
      item.className = 'stack-element';
      item.textContent = val;
      stackBucket.appendChild(item);
    });
    if (stackTopLabel) {
      stackTopLabel.textContent = stackData.length > 0 
        ? `TOP [${stackData.length - 1}] ➔ ${stackData[stackData.length - 1]}`
        : 'TOP ➔ EMPTY';
    }
  }

  btnPushStack?.addEventListener('click', () => {
    if (stackData.length >= 5) {
      if (stackExplText) stackExplText.textContent = 'Stack Overflow Warning! Maximum buffer reached for demo.';
      return;
    }
    const newVal = Math.floor(Math.random() * 90) + 10;
    stackData.push(newVal);
    renderStack();
    if (stackExplText) stackExplText.textContent = `push(${newVal}): Pushed element onto stack in O(1) time. New TOP is ${newVal}.`;
  });

  btnPopStack?.addEventListener('click', () => {
    if (stackData.length === 0) {
      if (stackExplText) stackExplText.textContent = 'Stack Underflow! Cannot pop from an empty stack.';
      return;
    }
    const elements = stackBucket.querySelectorAll('.stack-element');
    const topEl = elements[elements.length - 1];
    if (topEl) {
      topEl.classList.add('is-popping');
      setTimeout(() => {
        const popped = stackData.pop();
        renderStack();
        if (stackExplText) stackExplText.textContent = `pop(): Removed TOP element ${popped} in O(1) time. (Last-In, First-Out principle)`;
      }, 200);
    } else {
      const popped = stackData.pop();
      renderStack();
      if (stackExplText) stackExplText.textContent = `pop(): Removed TOP element ${popped} in O(1) time. (Last-In, First-Out principle)`;
    }
  });

  btnPeekStack?.addEventListener('click', () => {
    if (stackData.length === 0) {
      if (stackExplText) stackExplText.textContent = 'Stack is empty. Peek returned NULL.';
      return;
    }
    const topVal = stackData[stackData.length - 1];
    if (stackExplText) stackExplText.textContent = `peek(): TOP element is ${topVal} without modifying stack (O(1)).`;
    const elements = stackBucket.querySelectorAll('.stack-element');
    const topEl = elements[elements.length - 1];
    if (topEl) {
      topEl.classList.add('is-peeking');
      setTimeout(() => {
        topEl.classList.remove('is-peeking');
      }, 700);
    }
  });

  renderStack();


  // --- MODULE D: QUEUE (FIFO) ---
  let queueData = [10, 20, 30, 40];
  const queueChannel = document.getElementById('queueChannel');
  const queueExplText = document.getElementById('queueExplText');
  const btnEnqueue = document.getElementById('btnEnqueue');
  const btnDequeue = document.getElementById('btnDequeue');
  const btnFrontQueue = document.getElementById('btnFrontQueue');

  function renderQueue() {
    if (!queueChannel) return;
    queueChannel.innerHTML = '';
    queueData.forEach(val => {
      const item = document.createElement('div');
      item.className = 'queue-item';
      item.textContent = val;
      queueChannel.appendChild(item);
    });
  }

  btnEnqueue?.addEventListener('click', () => {
    if (queueData.length >= 6) {
      if (queueExplText) queueExplText.textContent = 'Queue capacity full for demo.';
      return;
    }
    const newVal = Math.floor(Math.random() * 90) + 10;
    queueData.push(newVal);
    renderQueue();
    if (queueExplText) queueExplText.textContent = `enqueue(${newVal}): Added to REAR in O(1) time. First-In, First-Out.`;
  });

  btnDequeue?.addEventListener('click', () => {
    if (queueData.length === 0) {
      if (queueExplText) queueExplText.textContent = 'Queue Underflow! Nothing to dequeue.';
      return;
    }
    const items = queueChannel.querySelectorAll('.queue-item');
    const frontItem = items[0];
    if (frontItem) {
      frontItem.classList.add('is-dequeuing');
      setTimeout(() => {
        const dequeued = queueData.shift();
        renderQueue();
        if (queueExplText) queueExplText.textContent = `dequeue(): Removed FRONT element ${dequeued} in O(1) time (FIFO order).`;
      }, 220);
    } else {
      const dequeued = queueData.shift();
      renderQueue();
      if (queueExplText) queueExplText.textContent = `dequeue(): Removed FRONT element ${dequeued} in O(1) time (FIFO order).`;
    }
  });

  btnFrontQueue?.addEventListener('click', () => {
    if (queueData.length === 0) {
      if (queueExplText) queueExplText.textContent = 'Queue is empty.';
      return;
    }
    const frontVal = queueData[0];
    if (queueExplText) queueExplText.textContent = `front(): Next element in line is ${frontVal} (O(1)).`;
    const items = queueChannel.querySelectorAll('.queue-item');
    if (items[0]) {
      items[0].classList.add('is-peeking');
      setTimeout(() => {
        items[0].classList.remove('is-peeking');
      }, 700);
    }
  });

  renderQueue();


  // --- MODULE E: BINARY TREE ---
  const treeNodes = {
    20: { val: 20, left: 10, right: 30 },
    10: { val: 10, left: 5, right: 15 },
    30: { val: 30, left: 25, right: 35 },
    5: { val: 5, left: null, right: null },
    15: { val: 15, left: null, right: null },
    25: { val: 25, left: null, right: null },
    35: { val: 35, left: null, right: null }
  };

  const treeExplText = document.getElementById('treeExplText');
  const treeTraversalResult = document.getElementById('treeTraversalResult');
  const btnInorder = document.getElementById('btnInorder');
  const btnPreorder = document.getElementById('btnPreorder');
  const btnPostorder = document.getElementById('btnPostorder');

  function highlightTreeNode(val) {
    const circles = document.querySelectorAll('.tree-node-circle');
    circles.forEach(c => {
      if (parseInt(c.getAttribute('data-node-val'), 10) === val) {
        c.classList.add('is-active');
      } else {
        c.classList.remove('is-active');
      }
    });
  }

  function runTreeAnimation(orderArray, name) {
    let idx = 0;
    if (treeTraversalResult) {
      treeTraversalResult.innerHTML = `<strong>${name}:</strong> <span class="traversal-chip-wrap" style="display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-left: 8px;"></span>`;
    }
    const chipWrap = treeTraversalResult?.querySelector('.traversal-chip-wrap');
    if (treeExplText) treeExplText.textContent = `Running ${name} traversal...`;

    const timer = setInterval(() => {
      if (idx < orderArray.length) {
        const val = orderArray[idx];
        highlightTreeNode(val);
        if (chipWrap) {
          const chip = document.createElement('span');
          chip.className = 'traversal-chip';
          chip.textContent = val;
          chipWrap.appendChild(chip);
          if (idx < orderArray.length - 1) {
            const arrSpan = document.createElement('span');
            arrSpan.style.color = '#94a3b8';
            arrSpan.style.fontSize = '0.75rem';
            arrSpan.textContent = '➔';
            chipWrap.appendChild(arrSpan);
          }
        }
        idx++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          document.querySelectorAll('.tree-node-circle').forEach(c => c.classList.remove('is-active'));
          if (treeExplText) treeExplText.textContent = `${name} Traversal complete! Notice how Inorder traversal on a BST yields sorted order.`;
        }, 800);
      }
    }, 550);
  }

  btnInorder?.addEventListener('click', () => {
    // Inorder: Left, Root, Right -> 5, 10, 15, 20, 25, 30, 35
    runTreeAnimation([5, 10, 15, 20, 25, 30, 35], 'Inorder (L-Root-R)');
  });

  btnPreorder?.addEventListener('click', () => {
    // Preorder: Root, Left, Right -> 20, 10, 5, 15, 30, 25, 35
    runTreeAnimation([20, 10, 5, 15, 30, 25, 35], 'Preorder (Root-L-R)');
  });

  btnPostorder?.addEventListener('click', () => {
    // Postorder: Left, Right, Root -> 5, 15, 10, 25, 35, 30, 20
    runTreeAnimation([5, 15, 10, 25, 35, 30, 20], 'Postorder (L-R-Root)');
  });

  document.querySelectorAll('.tree-node-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      const val = parseInt(circle.getAttribute('data-node-val'), 10);
      highlightTreeNode(val);
      const info = treeNodes[val];
      if (treeExplText) {
        treeExplText.textContent = `Node (${val}) selected. Left Child: ${info.left || 'NULL'}, Right Child: ${info.right || 'NULL'}.`;
      }
    });
  });


  // --- MODULE F: SORTING VISUALIZER ---
  let sortArray = [45, 18, 72, 30, 95, 12, 60, 38];
  const sortBarsStage = document.getElementById('sortBarsStage');
  const sortExplText = document.getElementById('sortExplText');
  const btnStartSort = document.getElementById('btnStartSort');
  const btnResetSort = document.getElementById('btnResetSort');
  const btnRandomizeSort = document.getElementById('btnRandomizeSort');
  const sortAlgoSelect = document.getElementById('sortAlgoSelect');
  let isSorting = false;

  function renderSortBars() {
    if (!sortBarsStage) return;
    sortBarsStage.innerHTML = '';
    const maxVal = Math.max(...sortArray);
    sortArray.forEach((val, idx) => {
      const col = document.createElement('div');
      col.className = 'sort-bar-column';
      col.innerHTML = `
        <div class="sort-bar" id="bar-${idx}" style="height: ${(val / maxVal) * 160}px;"></div>
        <span class="sort-val">${val}</span>
      `;
      sortBarsStage.appendChild(col);
    });
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  async function bubbleSort() {
    isSorting = true;
    const n = sortArray.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (!isSorting) return;
        const barA = document.getElementById(`bar-${j}`);
        const barB = document.getElementById(`bar-${j + 1}`);

        barA?.classList.add('is-comparing');
        barB?.classList.add('is-comparing');
        comparisons++;
        if (sortExplText) sortExplText.textContent = `Comparing ${sortArray[j]} and ${sortArray[j+1]}... (Comparisons: ${comparisons}, Swaps: ${swaps})`;
        await sleep(300);

        if (sortArray[j] > sortArray[j + 1]) {
          barA?.classList.remove('is-comparing');
          barB?.classList.remove('is-comparing');
          barA?.classList.add('is-swapping');
          barB?.classList.add('is-swapping');

          // Swap values
          const temp = sortArray[j];
          sortArray[j] = sortArray[j + 1];
          sortArray[j + 1] = temp;
          swaps++;

          renderSortBars();
          await sleep(250);
        }

        document.getElementById(`bar-${j}`)?.classList.remove('is-comparing', 'is-swapping');
        document.getElementById(`bar-${j+1}`)?.classList.remove('is-comparing', 'is-swapping');
      }
      document.getElementById(`bar-${n - 1 - i}`)?.classList.add('is-sorted');
    }
    document.getElementById('bar-0')?.classList.add('is-sorted');
    isSorting = false;
    if (sortExplText) sortExplText.textContent = `Bubble Sort Complete! Sorted ${n} elements with ${comparisons} comparisons and ${swaps} swaps.`;
  }

  async function selectionSort() {
    isSorting = true;
    const n = sortArray.length;
    let comparisons = 0;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      document.getElementById(`bar-${i}`)?.classList.add('is-comparing');

      for (let j = i + 1; j < n; j++) {
        if (!isSorting) return;
        const currentBar = document.getElementById(`bar-${j}`);
        currentBar?.classList.add('is-comparing');
        comparisons++;
        await sleep(220);

        if (sortArray[j] < sortArray[minIdx]) {
          document.getElementById(`bar-${minIdx}`)?.classList.remove('is-comparing');
          minIdx = j;
          document.getElementById(`bar-${minIdx}`)?.classList.add('is-swapping');
        } else {
          currentBar?.classList.remove('is-comparing');
        }
      }

      if (minIdx !== i) {
        const temp = sortArray[i];
        sortArray[i] = sortArray[minIdx];
        sortArray[minIdx] = temp;
        swaps++;
        renderSortBars();
        await sleep(250);
      }

      document.querySelectorAll('.sort-bar').forEach(b => b.classList.remove('is-comparing', 'is-swapping'));
      document.getElementById(`bar-${i}`)?.classList.add('is-sorted');
    }
    document.getElementById(`bar-${n - 1}`)?.classList.add('is-sorted');
    isSorting = false;
    if (sortExplText) sortExplText.textContent = `Selection Sort Complete! Sorted with ${comparisons} comparisons and ${swaps} swaps.`;
  }

  btnStartSort?.addEventListener('click', () => {
    if (isSorting) return;
    const algo = sortAlgoSelect ? sortAlgoSelect.value : 'bubble';
    if (algo === 'bubble') {
      bubbleSort();
    } else {
      selectionSort();
    }
  });

  btnResetSort?.addEventListener('click', () => {
    isSorting = false;
    sortArray = [45, 18, 72, 30, 95, 12, 60, 38];
    renderSortBars();
    if (sortExplText) sortExplText.textContent = 'Array reset to initial state.';
  });

  btnRandomizeSort?.addEventListener('click', () => {
    isSorting = false;
    sortArray = Array.from({ length: 8 }, () => Math.floor(Math.random() * 85) + 12);
    renderSortBars();
    if (sortExplText) sortExplText.textContent = 'Generated new randomized array.';
  });

  renderSortBars();


  /* ------------------------------------------------------------
     7. COURSES & LEARNING PATHS (FILTERING & SEARCH)
     ------------------------------------------------------------ */
  const courseFilterBtns = document.querySelectorAll('.course-filter-btn');
  const courseSearchInput = document.getElementById('courseSearchInput');
  const courseCards = document.querySelectorAll('.course-card');

  function filterCourses() {
    const activeCategory = document.querySelector('.course-filter-btn.is-active')?.getAttribute('data-filter') || 'all';
    const query = courseSearchInput?.value.toLowerCase().trim() || '';

    courseCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardText = card.textContent.toLowerCase();

      const matchesCat = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchesSearch = (!query || cardText.includes(query));

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  courseFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      courseFilterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      filterCourses();
    });
  });

  courseSearchInput?.addEventListener('input', filterCourses);

  // Course Details Modal Interaction
  const courseModal = document.getElementById('courseModal');
  const courseModalTitle = document.getElementById('courseModalTitle');
  const courseModalBody = document.getElementById('courseModalBody');
  const closeCourseModalBtn = document.getElementById('closeCourseModalBtn');
  const courseModalEnquireBtn = document.getElementById('courseModalEnquireBtn');
  let selectedCourseName = '';

  const courseSyllabusData = {
    'Class 11 Computer Science': {
      track: 'School Board Foundation (CBSE / ISC / State)',
      duration: '10 Months Academic Batch',
      prereq: 'No prior coding experience required',
      syllabus: [
        'Computer Systems Architecture & Memory Hierarchy',
        'Data Representation & Number Systems (Binary, Octal, Hex, 2s Complement)',
        'Computational Problem Solving, Algorithms & Flowcharts',
        'Python Programming: Syntax, Variables, Data Types & Operators',
        'Conditional Statements & Iterative Loops (while, for, range)',
        'Strings, Lists, Tuples & Dictionaries in Python',
        'Modular Programming & Function Definitions'
      ]
    },
    'Class 12 Computer Science': {
      track: 'Board Examination & Entrance Target',
      duration: '10 Months Intensive Batch',
      prereq: 'Class 11 CS or basic Python foundation',
      syllabus: [
        'Advanced Python: Recursion, Scope, and Exception Handling',
        'Data File Handling: Text, CSV, and Binary Pickle Files',
        'Linear Data Structures: Stacks and Queues implementation in Python',
        'Relational Databases & SQL (DDL, DML, Joins, Group By, Aggregate Functions)',
        'Computer Networks: OSI/TCP-IP models, Topologies, Routing, DNS',
        'Cyber Security, Digital Footprints & Cyber Ethics'
      ]
    },
    'B.Tech Computer Science (Core Support)': {
      track: 'University Engineering Pathway',
      duration: 'Semester-wise Module Coaching',
      prereq: 'First-year / Second-year Engineering Student',
      syllabus: [
        'Data Structures & Algorithm Design (Time & Space Complexity)',
        'Object-Oriented Programming with C++ / Java',
        'Operating Systems: Processes, Threads, CPU Scheduling, Deadlocks',
        'Database Management Systems & Relational Schema Design',
        'Computer Organization & Architecture',
        'Hands-on Lab Assignments & Semester Exam Preparation'
      ]
    },
    'B.Tech AI & Machine Learning': {
      track: 'Specialized Modern Technology Pathway',
      duration: 'Specialized Semester Pathway',
      prereq: 'Basic Programming & Linear Algebra',
      syllabus: [
        'Foundational Python for Scientific Computing (NumPy, Pandas)',
        'Linear Algebra, Multivariate Calculus & Probability for ML',
        'Supervised & Unsupervised Learning Algorithms',
        'Neural Network Foundations & Backpropagation',
        'Model Evaluation, Overfitting & Hyperparameter Tuning'
      ]
    },
    'BCA & MCA Degree Mentorship': {
      track: 'Computer Applications University Pathway',
      duration: 'Full Semester Guidance',
      prereq: 'BCA / MCA Enrolled Student',
      syllabus: [
        'Programming in C, C++, and Core Java',
        'Discrete Mathematics & Computational Logic',
        'Web Systems & Modern Database Engineering',
        'Software Engineering Methodologies (Agile, SDLC)',
        'Final Year Capstone Project Mentorship & Code Guidance'
      ]
    },
    'Python Programming & Problem Solving': {
      track: 'Beginner to Advanced Coding Track',
      duration: '12 Weeks Practical Bootcamp',
      prereq: 'Curiosity & Basic Computer Literacy',
      syllabus: [
        'Python Syntax, Control Flow, and Idiomatic Patterns',
        'Data Structures: Lists, Dictionaries, Sets & Comprehensions',
        'Object-Oriented Design: Classes, Inheritance, Polymorphism',
        'File I/O, Error Handling, and Logging',
        'Standard Library Modules, Virtual Environments & Pip'
      ]
    },
    'C & C++ Masterclass with DSA': {
      track: 'System Programming & Rigorous Foundation',
      duration: '16 Weeks Intensive Track',
      prereq: 'Willingness to master memory mechanics',
      syllabus: [
        'Pointers, References, and Manual Memory Management (malloc/free/new/delete)',
        'C++ Standard Template Library (vector, map, set, priority_queue)',
        'Recursion, Backtracking & Divide and Conquer',
        'Array, LinkedList, Stack, Queue, Tree & Graph Implementations',
        'Competitive Problem-Solving Patterns'
      ]
    },
    'Full-Stack Web Development Foundations': {
      track: 'Practical Developer Workspace',
      duration: '14 Weeks Project-Based Course',
      prereq: 'Basic computer understanding',
      syllabus: [
        'Semantic HTML5 & Modern Responsive CSS3 (Flexbox & Grid)',
        'Modern JavaScript (ES6+, Promises, Async/Await, DOM Manipulation)',
        'RESTful API Architecture & Client-Server Communication',
        'Version Control with Git & GitHub Workflow',
        'Building and Deploying Production Web Applications'
      ]
    }
  };

  document.querySelectorAll('.open-course-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-course-title') || 'Course Details';
      selectedCourseName = title;
      const data = courseSyllabusData[title] || {
        track: 'Comprehensive Computer Science Curriculum',
        duration: 'Flexible Batch Timings',
        prereq: 'Contact faculty for batch prerequisites',
        syllabus: [
          'Conceptual first-principles foundations',
          'Interactive coding exercises & assignments',
          'Small-batch doubt solving & code reviews'
        ]
      };

      if (courseModalTitle) courseModalTitle.textContent = title;
      if (courseModalBody) {
        courseModalBody.innerHTML = `
          <div style="margin-bottom: 16px;">
            <span class="course-level-badge level-intermediate" style="margin-right: 8px;">${escapeHTML(data.track)}</span>
            <span style="font-size: 0.8rem; color: #64748b;">${escapeHTML(data.duration)}</span>
          </div>
          <p style="font-size: 0.88rem; color: #475569; margin-bottom: 16px;">
            <strong>Prerequisite:</strong> ${escapeHTML(data.prereq)}
          </p>
          <h5 style="font-size: 0.95rem; font-weight: 700; color: #0f172a; margin-bottom: 10px;">Curriculum Outline:</h5>
          <ul style="display: flex; flex-direction: column; gap: 8px; font-size: 0.86rem; color: #334155;">
            ${data.syllabus.map(item => `
              <li style="display: flex; align-items: flex-start; gap: 8px;">
                <span style="color: #2563eb; font-weight: bold;">✓</span>
                <span>${escapeHTML(item)}</span>
              </li>
            `).join('')}
          </ul>
        `;
      }

      if (courseModal) {
        courseModal.classList.add('is-open');
        courseModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  function closeCourseModal() {
    if (courseModal) {
      courseModal.classList.remove('is-open');
      courseModal.setAttribute('aria-hidden', 'true');
    }
  }

  closeCourseModalBtn?.addEventListener('click', closeCourseModal);
  courseModal?.addEventListener('click', (e) => {
    if (e.target === courseModal) closeCourseModal();
  });

  courseModalEnquireBtn?.addEventListener('click', () => {
    closeCourseModal();
    const studentClass = document.getElementById('studentClass');
    if (studentClass && selectedCourseName) {
      // Find matching option
      for (let i = 0; i < studentClass.options.length; i++) {
        if (selectedCourseName.includes('11') && studentClass.options[i].value.includes('11')) {
          studentClass.selectedIndex = i;
          break;
        } else if (selectedCourseName.includes('12') && studentClass.options[i].value.includes('12')) {
          studentClass.selectedIndex = i;
          break;
        } else if (selectedCourseName.includes('B.Tech') && studentClass.options[i].value.includes('College')) {
          studentClass.selectedIndex = i;
          break;
        } else if (selectedCourseName.includes('Python') || selectedCourseName.includes('C++') || selectedCourseName.includes('Web')) {
          studentClass.selectedIndex = i;
          break;
        }
      }
    }
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  });


  /* ------------------------------------------------------------
     8. CODING PLAYGROUND ("WRITE. RUN. LEARN." - SECTION 10)
     ------------------------------------------------------------ */
  const playgroundTabs = document.querySelectorAll('.playground-tab');
  const codeTextarea = document.getElementById('codeTextarea');
  const playgroundIframe = document.getElementById('playgroundIframe');
  const btnRunPlayground = document.getElementById('btnRunPlayground');
  const btnResetPlayground = document.getElementById('btnResetPlayground');

  const playgroundSnippets = {
    html: `<div class="card">
  <h2>Hello from Scholars Hub!</h2>
  <p>Learn Computer Science with Arpan Sir.</p>
  <button id="clickBtn">Click Me</button>
  <span id="counter">0 clicks</span>
</div>`,
    css: `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 280px;
  background: #f0f7ff;
  margin: 0;
}
.card {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(37,99,235,0.15);
  text-align: center;
  border: 1px solid #bfdbfe;
  max-width: 320px;
}
h2 {
  color: #1e293b;
  font-size: 1.25rem;
  margin-top: 0;
}
p {
  color: #64748b;
  font-size: 0.9rem;
}
button {
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 99px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
}
button:hover {
  transform: scale(1.05);
}
#counter {
  display: block;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #2563eb;
  font-weight: bold;
}`,
    js: `// Safe JavaScript logic
let count = 0;
const btn = document.getElementById('clickBtn');
const counter = document.getElementById('counter');

if (btn && counter) {
  btn.addEventListener('click', () => {
    count++;
    counter.textContent = count + (count === 1 ? ' click' : ' clicks');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => { btn.style.transform = 'scale(1.05)'; }, 100);
  });
}`
  };

  let activePlaygroundTab = 'html';
  let playgroundState = { ...playgroundSnippets };

  function updatePlaygroundEditor() {
    if (codeTextarea) {
      codeTextarea.value = playgroundState[activePlaygroundTab];
    }
  }

  playgroundTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Save current tab content before switching
      if (codeTextarea) {
        playgroundState[activePlaygroundTab] = codeTextarea.value;
      }
      playgroundTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      activePlaygroundTab = tab.getAttribute('data-tab');
      if (codeTextarea) {
        codeTextarea.style.opacity = '0.5';
        updatePlaygroundEditor();
        requestAnimationFrame(() => {
          codeTextarea.style.opacity = '1';
        });
      } else {
        updatePlaygroundEditor();
      }
    });
  });

  if (codeTextarea) {
    codeTextarea.addEventListener('input', () => {
      playgroundState[activePlaygroundTab] = codeTextarea.value;
    });
  }

  function runPlaygroundPreview() {
    if (!playgroundIframe) return;
    if (codeTextarea) {
      playgroundState[activePlaygroundTab] = codeTextarea.value;
    }

    if (btnRunPlayground) {
      btnRunPlayground.classList.add('is-running');
      btnRunPlayground.innerHTML = `<span>⏳</span> Compiling...`;
    }
    playgroundIframe.classList.add('is-refreshing');

    setTimeout(() => {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>${playgroundState.css}</style>
          </head>
          <body>
            ${playgroundState.html}
            <script>
              try {
                ${playgroundState.js}
              } catch(e) {
                console.error(e);
              }
            <\/script>
          </body>
        </html>
      `;

      playgroundIframe.srcdoc = htmlContent;
      playgroundIframe.classList.remove('is-refreshing');
      if (btnRunPlayground) {
        btnRunPlayground.classList.remove('is-running');
        btnRunPlayground.innerHTML = `<span>▶</span> Run Preview`;
      }
      showToast('Sandbox preview updated!');
    }, 180);
  }

  btnRunPlayground?.addEventListener('click', runPlaygroundPreview);

  btnResetPlayground?.addEventListener('click', () => {
    playgroundState = { ...playgroundSnippets };
    updatePlaygroundEditor();
    runPlaygroundPreview();
    showToast('Playground reset to default template.');
  });

  // Initial load of playground
  updatePlaygroundEditor();
  runPlaygroundPreview();


  /* ------------------------------------------------------------
     9. FAQ ACCORDION (SMOOTH EXPAND / COLLAPSE)
     ------------------------------------------------------------ */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      // Close all other accordion panels
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('is-open');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
          const otherAns = other.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('is-open');
        questionBtn.setAttribute('aria-expanded', 'false');
        if (answer) answer.style.maxHeight = null;
      } else {
        item.classList.add('is-open');
        questionBtn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
      }
    });
  });


  /* ------------------------------------------------------------
     10. CONTACT FORM & DEMO MODAL VALIDATION
     ------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('studentName');
      const emailInput = document.getElementById('studentEmail');
      const classSelect = document.getElementById('studentClass');
      const phoneInput = document.getElementById('studentPhone');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        showFieldError(nameInput);
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Class
      if (!classSelect.value) {
        showFieldError(classSelect);
        isValid = false;
      } else {
        clearFieldError(classSelect);
      }

      // Validate Phone (10 digits)
      const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
      if (phoneVal.length !== 10) {
        showFieldError(phoneInput);
        isValid = false;
      } else {
        clearFieldError(phoneInput);
      }

      if (isValid) {
        formFeedback.className = 'form-feedback is-success';
        formFeedback.innerHTML = `
          <strong>Thank you, ${escapeHTML(nameInput.value.trim())}!</strong><br>
          Your enquiry for <em>${escapeHTML(classSelect.value)}</em> has been recorded. Our academic coordinator for Arpan Sir will reach out on WhatsApp (+91 ${phoneVal}) within 24 hours.<br>
          <small style="color: #64748b;">(Note: Frontend verified; production database sync scheduled.)</small>
        `;
        contactForm.reset();
        showToast('Enquiry received successfully!');
      } else {
        formFeedback.className = 'form-feedback is-error';
        formFeedback.textContent = 'Please fill out all required fields with a valid 10-digit phone number.';
      }
    });

    ['studentName', 'studentClass', 'studentPhone', 'studentEmail'].forEach(id => {
      const field = document.getElementById(id);
      if (field) {
        field.addEventListener('input', () => clearFieldError(field));
        field.addEventListener('change', () => clearFieldError(field));
      }
    });
  }

  function showFieldError(field) {
    field.classList.add('is-invalid');
    const group = field.closest('.form-group');
    if (group) group.classList.add('has-error');
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const group = field.closest('.form-group');
    if (group) group.classList.remove('has-error');
  }


  // --- FREE DEMO CLASS MODAL ---
  const demoModal = document.getElementById('demoModal');
  const openDemoModalBtns = document.querySelectorAll('.open-demo-modal');
  const closeDemoModalBtn = document.getElementById('closeDemoModalBtn');
  const demoModalForm = document.getElementById('demoModalForm');
  const modalFeedback = document.getElementById('modalFeedback');

  function openDemo() {
    if (demoModal) {
      demoModal.classList.add('is-open');
      demoModal.setAttribute('aria-hidden', 'false');
      const firstInput = document.getElementById('demoName');
      if (firstInput) setTimeout(() => firstInput.focus(), 200);
    }
  }

  function closeDemo() {
    if (demoModal) {
      demoModal.classList.remove('is-open');
      demoModal.setAttribute('aria-hidden', 'true');
      if (modalFeedback) modalFeedback.innerHTML = '';
      if (demoModalForm) demoModalForm.reset();
    }
  }

  openDemoModalBtns.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDemo();
  }));

  closeDemoModalBtn?.addEventListener('click', closeDemo);
  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) closeDemo();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDemo();
      closeCourseModal();
    }
  });

  demoModalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const demoName = document.getElementById('demoName').value.trim();
    const demoClass = document.getElementById('demoClass').value;
    const demoPhone = document.getElementById('demoPhone').value.trim().replace(/\D/g, '');

    if (!demoName || !demoClass || demoPhone.length !== 10) {
      modalFeedback.className = 'form-feedback is-error';
      modalFeedback.textContent = 'Please provide name, program, and a 10-digit WhatsApp number.';
      return;
    }

    modalFeedback.className = 'form-feedback is-success';
    modalFeedback.innerHTML = `
      <strong>Demo Slot Requested!</strong><br>
      Thank you, ${escapeHTML(demoName)}. Our academic counselor will confirm your demo schedule on WhatsApp (+91 ${demoPhone}).
    `;

    setTimeout(() => {
      closeDemo();
      showToast('Demo Class request submitted!');
    }, 2200);
  });


  /* ------------------------------------------------------------
     11. RESOURCE DOWNLOAD TOAST ALERTS
     ------------------------------------------------------------ */
  const downloadBtns = document.querySelectorAll('.btn-download');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const fileName = btn.getAttribute('data-file') || 'CS-Notes.pdf';
      btn.innerHTML = `<span>✓</span> Downloaded`;
      btn.style.backgroundColor = 'var(--emerald)';
      btn.style.color = '#ffffff';

      showToast(`Preparing ${fileName} for download...`);

      setTimeout(() => {
        btn.innerHTML = `<span>↓</span> Download PDF`;
        btn.style.backgroundColor = '';
        btn.style.color = '';
      }, 3500);
    });
  });


  /* ------------------------------------------------------------
     12. TOAST NOTIFICATION UTILITY
     ------------------------------------------------------------ */
  const toastNotification = document.getElementById('toastNotification');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.textContent = message;
    toastNotification.classList.add('is-visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotification.classList.remove('is-visible');
    }, 3600);
  }


  /* ------------------------------------------------------------
     13. FOOTER DYNAMIC YEAR & UTILS
     ------------------------------------------------------------ */
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});
